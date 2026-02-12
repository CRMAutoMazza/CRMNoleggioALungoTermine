"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require('fs');
const path = require('path');
process.on('uncaughtException', (err) => {
    const crashLog = path.join(process.cwd(), 'runtime_crash.txt');
    fs.appendFileSync(crashLog, `[${new Date().toISOString()}] UNCAUGHT EXCEPTION: ${err.message}\nSTACK: ${err.stack}\n`);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    const crashLog = path.join(process.cwd(), 'runtime_crash.txt');
    fs.appendFileSync(crashLog, `[${new Date().toISOString()}] UNHANDLED REJECTION: ${reason}\nStack: ${reason === null || reason === void 0 ? void 0 : reason.stack}\n`);
});
async function bootstrap() {
    try {
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(process.cwd(), 'startup_log.txt');
        fs.writeFileSync(logPath, `Starting backend at ${new Date().toISOString()}\n`);
        fs.appendFileSync(logPath, `CWD: ${process.cwd()}\n`);
        fs.appendFileSync(logPath, `PORT: ${process.env.PORT}\n`);
        fs.appendFileSync(logPath, `DATABASE_URL available: ${!!process.env.DATABASE_URL}\n`);
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        console.log('CORS Enabled for all origins');
        console.log(`Backend listening on port ${process.env.PORT || 3000}`);
        await app.listen(process.env.PORT || 3000, '0.0.0.0');
    }
    catch (error) {
        const fs = require('fs');
        const path = require('path');
        const errPath = path.join(process.cwd(), 'startup_error.txt');
        fs.writeFileSync(errPath, `ERROR: ${error.message}\nSTACK: ${error.stack}\n`);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map