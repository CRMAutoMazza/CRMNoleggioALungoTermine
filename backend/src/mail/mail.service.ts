import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    async sendMail(settings: any, email: any) {
        if (!settings?.host || !settings?.user || !settings?.pass) {
            throw new Error('Incomplete SMTP settings');
        }

        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: settings.port || 465, // Default to SSL/TLS port
            secure: settings.secure !== undefined ? settings.secure : true, // Default to true for 465
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
        });

        const info = await transporter.sendMail({
            from: settings.from || settings.user, // Fallback to user if from is missing
            to: email.to,
            subject: email.subject,
            text: email.message,
            // html: email.html // Optional: if we ever send HTML
        });

        return { success: true, messageId: info.messageId };
    }

    async verifyConnection(settings: any) {
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
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
