const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn, exec } = require('child_process');
const nodemailer = require('nodemailer');
const http = require('http');

// BACKEND PROCESS MANAGEMENT
let backendProcess = null;
let isUsingExistingBackend = false;

// Helper to check if backend is already running and healthy
const checkBackendHealth = () => {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:3000/leads', (res) => {
            // Any response (even 401/404) means something is listening
            resolve(true);
        });

        req.on('error', (e) => {
            resolve(false);
        });

        req.setTimeout(2000, () => {
            req.destroy();
            resolve(false);
        });
    });
};

const killProcessOnPort = (port) => {
    return new Promise((resolve) => {
        const command = process.platform === 'win32'
            ? `powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort ${port}).OwningProcess -Force -ErrorAction SilentlyContinue"`
            : `lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`;

        console.log(`[Startup] Clearing port ${port} with command: ${command}`);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`[Startup] Port clear command result: ${error.message} (This is normal if port was legally released concurrently)`);
            } else {
                console.log(`[Startup] Port cleared successfully.`);
            }
            // Resolve anyway to continue
            resolve();
        });
    });
};

const startBackend = async () => {
    const isProd = app.isPackaged;
    let backendPath;
    let command;
    let args;

    // Capture recent logs in memory for the error dialog
    let recentLogs = [];
    const MAX_LOG_LINES = 20;

    // Log file path - Attempt to use a global path if AppData fails or for easier access
    const userDataPath = app.getPath('userData');
    const logPath = path.join(userDataPath, 'backend.log');

    // Ensure log directory exists
    if (!fs.existsSync(userDataPath)) {
        try {
            fs.mkdirSync(userDataPath, { recursive: true });
        } catch (e) {
            console.error('Failed to create userData directory:', e);
        }
    }

    const log = (msg) => {
        const timestamp = new Date().toISOString();
        const formattedMsg = `[${timestamp}] ${msg}\n`;
        console.log(msg);

        // Add to memory buffer
        recentLogs.push(msg);
        if (recentLogs.length > MAX_LOG_LINES) recentLogs.shift();

        try {
            fs.appendFileSync(logPath, formattedMsg);
        } catch (e) {
            console.error('Failed to write to log file:', e);
        }
    };

    // Reset log file on startup
    try {
        fs.writeFileSync(logPath, `--- BACKEND STARTUP SEQUENCE (v4 - Robust) ---\nApp Path: ${app.getAppPath()}\nResources Path: ${process.resourcesPath}\nUserData Path: ${userDataPath}\nIs Packaged: ${isProd}\n`);
    } catch (e) {
        console.error('Failed to initialize log file:', e);
    }

    // 1. Check for existing backend
    log('Checking for existing backend on port 3000...');
    const isAlive = await checkBackendHealth();

    if (isAlive) {
        log('Backend already detected running on port 3000. Reusing existing instance.');
        isUsingExistingBackend = true;
        return;
    }

    // 2. If not alive, but port might be stuck (TIME_WAIT etc or zombie), try to force clear
    // We already checked health and it failed, so whatever is there is broken or not our backend.
    log('Port 3000 not responding correctly. Attempting to clear port before spawn...');
    try {
        await killProcessOnPort(3000);
        // Wait a small moment for OS to release
        await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
        log(`Warning: Failed to clear port 3000: ${e.message}`);
    }


    if (isProd) {
        // In production, backend is in resources/backend
        // We expect the structure: resources/backend/dist/main.js
        const resourcesBackend = path.join(process.resourcesPath, 'backend');
        backendPath = resourcesBackend;

        const distPath = path.join(backendPath, 'dist');
        const mainJsPath = path.join(distPath, 'main.js');

        log(`Checking for backend at: ${mainJsPath}`);

        if (fs.existsSync(mainJsPath)) {
            log('Backend main.js found.');
            command = 'node';
            // Quote the path to handle spaces when shell: true
            args = [`"${mainJsPath}"`];
        } else {
            const errorMsg = `CRITICAL ERROR: Backend main.js NOT found at ${mainJsPath}\nContents of backend: ${fs.readdirSync(backendPath).join(', ')}`;
            log(errorMsg);

            const { dialog } = require('electron');
            dialog.showErrorBox('Backend Startup Error', `${errorMsg}\n\nLogs:\n${recentLogs.join('\n')}`);

            return;
        }
    } else {
        // In dev, backend is in ../backend relative to electron folder
        backendPath = path.join(__dirname, '../backend');
        log(`Dev mode. Backend path: ${backendPath}`);

        // We use npm to run the script in dev
        command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        args = ['run', 'start:dev'];
    }

    log(`Spawning backend process: ${command} ${args.join(' ')}`);

    // STRATEGY CHANGE: We use 'backend_modules' to bypass electron-builder exclusions
    const customModulesPath = path.join(backendPath, 'backend_modules');

    // LOAD ENV MANUALY
    let dbUrl = '';
    let jwtSecret = '';
    try {
        const envPath = path.join(backendPath, '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');

            // Parsing DB URL
            const dbMatch = envContent.match(/DATABASE_URL=(.*)/);
            if (dbMatch && dbMatch[1]) {
                dbUrl = dbMatch[1].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                log(`Loaded DATABASE_URL from ${envPath}`);
            }

            // Parsing JWT Secret
            const jwtMatch = envContent.match(/SUPABASE_JWT_SECRET=(.*)/);
            if (jwtMatch && jwtMatch[1]) {
                jwtSecret = jwtMatch[1].trim().replace(/^["']|["']$/g, '');
                log(`Loaded SUPABASE_JWT_SECRET from ${envPath}`);
            }
        }
    } catch (e) {
        log(`Failed to load .env: ${e.message}`);
    }

    const env = {
        ...process.env,
        PORT: '3000',
        DATABASE_URL: dbUrl || process.env.DATABASE_URL, // Prefer local .env, fallback to system
        SUPABASE_JWT_SECRET: jwtSecret || process.env.SUPABASE_JWT_SECRET,
        // Add custom modules path to search list.
        NODE_PATH: customModulesPath
    };

    try {
        backendProcess = spawn(command, args, {
            cwd: backendPath,
            env: env,
            shell: true // FIX: Required for npm on Windows to run correctly
        });

        backendProcess.stdout.on('data', (data) => {
            log(`[STDOUT] ${data}`);
        });

        backendProcess.stderr.on('data', (data) => {
            log(`[STDERR] ${data}`);
        });

        backendProcess.on('error', (err) => {
            const msg = `[SPAWN ERROR] ${err.message}`;
            log(msg);
            const { dialog } = require('electron');
            if (isProd) dialog.showErrorBox('Backend Spawn Error', `${msg}\n\nLogs:\n${recentLogs.join('\n')}`);
        });

        backendProcess.on('close', (code) => {
            log(`Backend process exited with code ${code}`);
            if (code !== 0 && code !== null) {
                // Only show error if we are NOT shutting down intentionally
                // But it's hard to know here.
                const { dialog } = require('electron');
                if (isProd) dialog.showErrorBox('Backend Exited', `Backend process exited unexpectedly with code ${code}.\n\nRecent Logs:\n${recentLogs.join('\n')}\n\nLog File: ${logPath}`);
            }
        });
    } catch (error) {
        log(`Failed to spawn backend: ${error.message}`);
        const { dialog } = require('electron');
        dialog.showErrorBox('Backend Startup Failure', `${error.message}\n\nLogs:\n${recentLogs.join('\n')}`);
    }
};

const killBackend = () => {
    if (backendProcess) {
        // On Windows, killing a shell (npm) might not kill children. 
        // But for 'node' direct spawn it should work.
        // Using tree-kill logic would be better but keeping it simple:
        try {
            backendProcess.kill();
        } catch (e) {
            console.error('Error killing backend:', e);
        }
        backendProcess = null;
    }
};

const isDev = !app.isPackaged;
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');


function createWindow() {
    const preloadPath = path.join(__dirname, 'preload.cjs');
    console.log('--- PRELOAD PATH CONFIGURED:', preloadPath);

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            webviewTag: true,
            preload: preloadPath
        },
        title: "CRM Application",
        backgroundColor: '#0f172a', // slate-950
        icon: isDev ? path.join(__dirname, '../public/vite.svg') : path.join(__dirname, '../dist/vite.svg'),
        autoHideMenuBar: true // Hide menu bar
    });

    win.setMenu(null); // Completely remove it

    if (isDev) {
        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools();
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
        // win.webContents.openDevTools();
    }
}

// SMTP Email Handler
ipcMain.handle('send-email', async (event, { settings, email }) => {
    const timestamp = new Date().toISOString();
    const logPrefix = `[SMTP ${timestamp}]`;
    console.log(`${logPrefix} Starting email send to: ${email.to}`);

    // Helper to append to main log (uses the existing log function logic from startBackend implicitly via console.log if we redirect, 
    // but better to reproduce the write logic or just rely on console.log if the app captures it. 
    // The startBackend 'log' function is local scope. We will rely on console.log which typical electron splitters capture, 
    // OR we can re-implement simple appending here for safety to ensure we catch it.)

    // REDUNDANT FILE LOGGING FOR SAFETY
    const { app } = require('electron');
    const fs = require('fs');
    const path = require('path');
    const userDataPath = app.getPath('userData');
    const logPath = path.join(userDataPath, 'email_debug.log');

    const logToFile = (msg) => {
        try {
            fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
        } catch (e) {
            console.error('Failed to log to file', e);
        }
    };

    logToFile(`Starting email send to: ${email.to}`);

    try {
        console.log(`${logPrefix} Validating settings...`);
        logToFile(`Validating settings...`);
        if (!settings.host || !settings.user || !settings.pass) {
            throw new Error('Settings incomplete');
        }

        console.log(`${logPrefix} Creating transporter for host: ${settings.host}, port: ${settings.port}, secure: ${settings.port == 465}`);
        logToFile(`Creating transporter for host: ${settings.host}, port: ${settings.port}, secure: ${settings.port == 465}`);

        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: parseInt(settings.port),
            secure: settings.port == 465, // true for 465, false for other ports
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000,
            debug: true, // Enable nodemailer debug output
            logger: true // Log to console
        });

        console.log(`${logPrefix} Transporter created. Attempting verify...`);
        logToFile(`Transporter created. Attempting verify...`);
        // Verify first to catch connection issues distinct from send issues
        await transporter.verify();
        console.log(`${logPrefix} Verify success. Sending mail...`);
        logToFile(`Verify success. Sending mail...`);

        const info = await transporter.sendMail({
            from: `"${settings.fromName || 'CRM System'}" <${settings.user}>`,
            to: email.to,
            subject: email.subject,
            text: email.message,
        });

        console.log(`${logPrefix} Send success. MessageID: ${info.messageId}`);
        logToFile(`Send success. MessageID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`${logPrefix} ERROR:`, error);
        if (typeof logToFile !== 'undefined') logToFile(`ERROR: ${error.message}\nStack: ${error.stack}`);
        return { success: false, error: error.message, stack: error.stack };
    }
});

// Verify SMTP Connection Handler
ipcMain.handle('verify-smtp', async (event, settings) => {
    try {
        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: parseInt(settings.port),
            secure: settings.port == 465, // true for 465, false for other ports
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000
        });

        await transporter.verify();
        return { success: true };
    } catch (error) {
        console.error('SMTP Verify Error:', error);
        return { success: false, error: error.message };
    }
});

// IMAP Email Handler - Headers Only (Fast & Robust)
ipcMain.handle('fetch-emails', async (event, settings) => {
    let connection = null;
    try {
        const config = {
            imap: {
                user: settings.user,
                password: settings.pass,
                host: settings.imapHost,
                port: 993,
                tls: true,
                authTimeout: 10000,
                tlsOptions: { rejectUnauthorized: false }
            }
        };

        connection = await imaps.connect(config);

        connection.on('error', (err) => {
            console.error('IMAP Connection Error:', err);
        });

        const box = await connection.openBox('INBOX');

        const totalMessages = box.messages.total;
        const start = Math.max(1, totalMessages - 19);
        const sequenceRange = `${start}:${totalMessages}`;

        const searchCriteria = [sequenceRange];
        const fetchOptions = {
            bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)'],
            markSeen: false,
            struct: true
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        const recentMessages = messages.reverse();

        const emails = await Promise.all(recentMessages.map(async (item) => {
            const headerPart = item.parts.find(part => part.which === 'HEADER.FIELDS (FROM SUBJECT DATE)');
            let subject = '(Nessun oggetto)';
            let from = 'Sconosciuto';

            if (headerPart && headerPart.body) {
                if (typeof headerPart.body === 'string') {
                    try {
                        const parsed = await simpleParser(headerPart.body);
                        subject = parsed.subject || '(Nessun oggetto)';
                        from = parsed.from?.text || 'Sconosciuto';
                    } catch (e) {
                        console.error('Header parsing error', e);
                    }
                } else if (typeof headerPart.body === 'object') {
                    from = (headerPart.body.from && headerPart.body.from.length > 0) ? headerPart.body.from[0] : 'Sconosciuto';
                    subject = (headerPart.body.subject && headerPart.body.subject.length > 0) ? headerPart.body.subject[0] : '(Nessun oggetto)';
                }
            }

            return {
                id: item.attributes.uid,
                from: from,
                subject: subject,
                date: item.attributes.date,
                hasBody: false
            };
        }));

        return { success: true, emails };
    } catch (error) {
        console.error('IMAP Error:', error);
        return { success: false, error: error.message };
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (e) {
                console.error('Error closing connection:', e);
            }
        }
    }
});

// IMAP Fetch Body Handler (On Demand & Robust)
ipcMain.handle('fetch-email-body', async (event, { settings, uid }) => {
    let connection = null;
    try {
        const config = {
            imap: {
                user: settings.user,
                password: settings.pass,
                host: settings.imapHost,
                port: 993,
                tls: true,
                authTimeout: 10000,
                tlsOptions: { rejectUnauthorized: false }
            }
        };

        connection = await imaps.connect(config);

        connection.on('error', (err) => {
            console.error('IMAP Body Connection Error:', err);
        });

        await connection.openBox('INBOX');

        const searchCriteria = [['UID', uid]];
        const fetchOptions = {
            bodies: [''],
            markSeen: true,
            struct: true
        };

        const messages = await connection.search(searchCriteria, fetchOptions);

        if (messages.length === 0) {
            return { success: false, error: 'Email non trovata' };
        }

        const item = messages[0];
        const all = item.parts.find(part => part.which === '');
        const parsed = await simpleParser(all.body);

        return {
            success: true,
            email: {
                text: parsed.text,
                html: parsed.html || parsed.textAsHtml
            }
        };
    } catch (error) {
        console.error('IMAP Body Error:', error);
        return { success: false, error: error.message };
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (e) {
                console.error('Error closing body connection:', e);
            }
        }
    }
});

// Delete Email Handler
ipcMain.handle('delete-email', async (event, { settings, uid }) => {
    let connection = null;
    try {
        const config = {
            imap: {
                user: settings.user,
                password: settings.pass,
                host: settings.imapHost,
                port: 993,
                tls: true,
                authTimeout: 10000,
                tlsOptions: { rejectUnauthorized: false }
            }
        };

        connection = await imaps.connect(config);

        // Open Box with readOnly: false to allow deletion
        await connection.openBox('INBOX');

        // Add Deleted flag
        await connection.addFlags(uid, '\\Deleted');

        // Expunge to permanently remove
        // Note: Some clients/servers might prefer moving to Trash instead.
        // For simplicity, we flag as deleted. Many servers expunge automatically or on close.
        // imap-simple doesn't expose expunge directly on connection easily without raw command?
        // Wait, imaps connection exposes `imap` object which is node-imap.
        // connection.imap.expunge(cb)

        await new Promise((resolve, reject) => {
            connection.imap.expunge((err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        return { success: true };
    } catch (error) {
        console.error('IMAP Delete Error:', error);
        return { success: false, error: error.message };
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (e) {
                console.error('Error closing delete connection:', e);
            }
        }
    }
});

// Document Manager Handlers
// Document Manager Handlers
// Allow customization via environment or config file in future, or just use generic name
const DOCS_ROOT = path.join(app.getPath('documents'), 'CRM_Data');

if (!fs.existsSync(DOCS_ROOT)) {
    fs.mkdirSync(DOCS_ROOT, { recursive: true });
}

ipcMain.handle('list-documents', async (event, folderPath = '') => {
    try {
        const targetPath = path.join(DOCS_ROOT, folderPath);
        if (!fs.existsSync(targetPath)) return [];

        const items = fs.readdirSync(targetPath, { withFileTypes: true });
        return items.map(item => ({
            name: item.name,
            isDirectory: item.isDirectory(),
            path: path.join(folderPath, item.name),
            size: item.isDirectory() ? 0 : fs.statSync(path.join(targetPath, item.name)).size,
            modified: fs.statSync(path.join(targetPath, item.name)).mtime
        }));
    } catch (error) {
        console.error('Docs Error:', error);
        return [];
    }
});

ipcMain.handle('create-folder', async (event, folderPath) => {
    try {
        const targetPath = path.join(DOCS_ROOT, folderPath);
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
});

ipcMain.handle('save-document', async (event, { folderPath, fileName, data }) => {
    try {
        const targetDir = path.join(DOCS_ROOT, folderPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Data comes as base64 string from FileReader usually: "data:application/pdf;base64,....."
        // We need to strip the prefix
        const base64Data = data.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');

        const filePath = path.join(targetDir, fileName);
        fs.writeFileSync(filePath, buffer);

        return { success: true, path: path.join(folderPath, fileName) };
    } catch (error) {
        console.error('Save Document Error:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('open-file', async (event, filePath) => {
    const targetPath = path.join(DOCS_ROOT, filePath);
    console.log('Opening file:', targetPath);
    const result = await shell.openPath(targetPath);
    if (result) {
        console.error('Error opening file:', result);
        return false;
    }
    return true;
});

ipcMain.handle('delete-document', async (event, relativePath) => {
    try {
        const targetPath = path.join(DOCS_ROOT, relativePath);
        if (!fs.existsSync(targetPath)) return false;

        const stat = fs.statSync(targetPath);
        if (stat.isDirectory()) {
            fs.rmdirSync(targetPath, { recursive: true });
        } else {
            fs.unlinkSync(targetPath);
        }
        return true;
    } catch (error) {
        console.error('Delete Document Error:', error);
        return false;
    }
});

app.whenReady().then(() => {
    startBackend();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('before-quit', () => {
    killBackend();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
