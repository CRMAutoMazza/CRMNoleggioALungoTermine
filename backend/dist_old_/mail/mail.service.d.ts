export declare class MailService {
    sendMail(settings: any, email: any): Promise<{
        success: boolean;
        messageId: string;
    }>;
    verifyConnection(settings: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}
