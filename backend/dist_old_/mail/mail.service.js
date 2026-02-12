"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    async sendMail(settings, email) {
        if (!(settings === null || settings === void 0 ? void 0 : settings.host) || !(settings === null || settings === void 0 ? void 0 : settings.user) || !(settings === null || settings === void 0 ? void 0 : settings.pass)) {
            throw new Error('Incomplete SMTP settings');
        }
        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: settings.port || 465,
            secure: settings.secure !== undefined ? settings.secure : true,
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
        });
        const info = await transporter.sendMail({
            from: settings.from || settings.user,
            to: email.to,
            subject: email.subject,
            text: email.message,
        });
        return { success: true, messageId: info.messageId };
    }
    async verifyConnection(settings) {
        try {
            const transporter = nodemailer.createTransport({
                host: settings.host,
                port: settings.port || 465,
                secure: settings.secure !== undefined ? settings.secure : (settings.port == 465),
                auth: {
                    user: settings.user,
                    pass: settings.pass,
                },
            });
            await transporter.verify();
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map