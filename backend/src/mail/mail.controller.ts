import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('send')
    async sendEmail(@Body() body: { settings: any; email: any }) {
        try {
            if (!body.settings || !body.email) {
                throw new HttpException('Missing settings or email data', HttpStatus.BAD_REQUEST);
            }
            return await this.mailService.sendMail(body.settings, body.email);
        } catch (error) {
            throw new HttpException(error.message || 'Error sending email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('verify')
    async verify(@Body() settings: any) {
        return await this.mailService.verifyConnection(settings);
    }
}
