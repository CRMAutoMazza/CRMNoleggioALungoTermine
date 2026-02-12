import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(body: {
        settings: any;
        email: any;
    }): Promise<{
        success: boolean;
        messageId: string;
    }>;
    verify(settings: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}
