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
    console.log(`[MAIN] Starting bootstrap... (Attempt: ${new Date().toISOString()})`);
    try {
        // DEBUG LOGGING
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(process.cwd(), 'startup_log.txt');
        fs.writeFileSync(logPath, `Starting backend at ${new Date().toISOString()}\n`);
        fs.appendFileSync(logPath, `CWD: ${process.cwd()}\n`);
        fs.appendFileSync(logPath, `PORT: ${process.env.PORT}\n`);
        fs.appendFileSync(logPath, `DATABASE_URL available: ${!!process.env.DATABASE_URL}\n`);

        const app = await NestFactory.create(AppModule, { bodyParser: false });
        console.log('[MAIN] NestFactory created.');

        // Simple Health Check for Railway
        app.getHttpAdapter().get('/', (req, res) => {
            res.send('Backend Online - AutoMazza CRM');
        });

        // RAW LOGGING for debugging 502
        const expressApp = app.getHttpAdapter().getInstance();
        expressApp.use((req, res, next) => {
            console.log(`[RAW] Request: ${req.method} ${req.url} from ${req.ip}`);
            next();
        });
        expressApp.get('/ping', (req, res) => {
            console.log('[RAW] /ping hit!');
            res.status(200).send('pong');
        });

        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        console.log('CORS Enabled for all origins');

        // INCREASE BODY LIMIT (Fix for Offers Upload)
        app.use(require('express').json({ limit: '50mb' }));
        app.use(require('express').urlencoded({ limit: '50mb', extended: true }));

        // FIX: Force Port 3000 because Dockerfile EXPOSE 3000 dictates Railway routing,
        // even if Railway injects PORT=8080 variable.
        const port = 3000;
        console.log(`[MAIN] Attempting to listen on port: ${port} (FORCED)`);

        //         await app.listen(port, '0.0.0.0');

        const serverInstance = await app.listen(port, '0.0.0.0');

        // FIX: Node.js default Keep-Alive (5s) is too short for Load Balancers (60s+)
        // This causes 502 errors because the server closes the connection while LB waits.
        serverInstance.keepAliveTimeout = 120000; // 120 seconds
        serverInstance.headersTimeout = 120000;   // 120 seconds

        const server = app.getHttpServer();
        const address = server.address();
        console.log(`[MAIN] Server address:`, address);
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
