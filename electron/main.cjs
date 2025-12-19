const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true // Enable <webview> for WhatsApp
        },
        title: "AutoMazza CRM",
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
    try {
        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: parseInt(settings.port),
            secure: settings.port == 465, // true for 465, false for other ports
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
        });

        const info = await transporter.sendMail({
            from: `"${settings.fromName || 'AutoMazza CRM'}" <${settings.user}>`,
            to: email.to,
            subject: email.subject,
            text: email.message,
        });

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('SMTP Error:', error);
        return { success: false, error: error.message };
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
                host: settings.imapHost || 'imaps.aruba.it',
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
                host: settings.imapHost || 'imaps.aruba.it',
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
                host: settings.imapHost || 'imaps.aruba.it',
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
const DOCS_ROOT = path.join(app.getPath('documents'), 'AutoMazza_Data');

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

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
