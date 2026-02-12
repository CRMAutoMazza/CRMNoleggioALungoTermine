import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// GLOBAL ERROR HANDLERS
const fs = require('fs');
const path = require('path');

process.on('uncaughtException', (err) => {
    const crashLog = path.join(process.cwd(), 'runtime_crash.txt');
    fs.appendFileSync(crashLog, `[${new Date().toISOString()}] UNCAUGHT EXCEPTION: ${err.message}\nSTACK: ${err.stack}\n`);
    // Keep process alive to allow log flush? No, usually safer to exit, but let's log first.
    process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise) => {
    const crashLog = path.join(process.cwd(), 'runtime_crash.txt');
    fs.appendFileSync(crashLog, `[${new Date().toISOString()}] UNHANDLED REJECTION: ${reason}\nStack: ${reason?.stack}\n`);
});

async function bootstrap() {
    try {
        // DEBUG LOGGING
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(process.cwd(), 'startup_log.txt');
        fs.writeFileSync(logPath, `Starting backend at ${new Date().toISOString()}\n`);
        fs.appendFileSync(logPath, `CWD: ${process.cwd()}\n`);
        fs.appendFileSync(logPath, `PORT: ${process.env.PORT}\n`);
        fs.appendFileSync(logPath, `DATABASE_URL available: ${!!process.env.DATABASE_URL}\n`);

        const app = await NestFactory.create(AppModule);

        // Simple Health Check for Railway
        app.getHttpAdapter().get('/', (req, res) => {
            res.send('Backend Online - AutoMazza CRM');
        });
        console.log('[MAIN] Starting bootstrap...');
        try {
            // DEBUG LOGGING
            const fs = require('fs');
            const path = require('path');
            const logPath = path.join(process.cwd(), 'startup_log.txt');
            fs.writeFileSync(logPath, `Starting backend at ${new Date().toISOString()}\n`);
            fs.appendFileSync(logPath, `CWD: ${process.cwd()}\n`);
            fs.appendFileSync(logPath, `PORT: ${process.env.PORT}\n`);
            fs.appendFileSync(logPath, `DATABASE_URL available: ${!!process.env.DATABASE_URL}\n`);

            const app = await NestFactory.create(AppModule);
            console.log('[MAIN] NestFactory created.');

            // Simple Health Check for Railway
            app.getHttpAdapter().get('/', (req, res) => {
                res.send('Backend Online - AutoMazza CRM');
            });
            app.enableCors({
                origin: true, // Allow any origin (including file://)
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                credentials: true,
            });
            console.log('CORS Enabled for all origins');

            const port = process.env.PORT || 3000;
            console.log(`[MAIN] Attempting to listen on port: ${port}`);

            await app.listen(port, '0.0.0.0');
            console.log(`[MAIN] Application is listening on: ${await app.getUrl()}`);
        } catch (error) {
            console.error('[MAIN] Error during bootstrap:', error);
            const fs = require('fs');
            const path = require('path');
            const errPath = path.join(process.cwd(), 'startup_error.txt');
            fs.writeFileSync(errPath, `ERROR: ${error.message}\nSTACK: ${error.stack}\n`);
            process.exit(1);
        }
    }
bootstrap();
    ```
