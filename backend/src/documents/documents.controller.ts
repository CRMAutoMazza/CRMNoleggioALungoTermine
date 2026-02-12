
import { Controller, Get, Post, Body, Query, BadRequestException, Delete, Res } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Get('list')
    async list(@Query('path') path: string) {
        return this.documentsService.listDocuments(path);
    }

    @Post('folder')
    async createFolder(@Body() body: { path: string }) {
        if (!body.path) throw new BadRequestException('Path is required');
        return this.documentsService.createFolder(body.path);
    }

    @Post('upload')
    async upload(@Body() body: { folderPath: string; fileName: string; data: string }) {
        if (!body.fileName || !body.data) throw new BadRequestException('Filename and data required');
        return this.documentsService.saveDocument(body.folderPath, body.fileName, body.data);
    }

    @Post('delete')
    async delete(@Body() body: { path: string }) {
        if (!body.path) throw new BadRequestException('Path is required');
        return this.documentsService.deleteDocument(body.path);
    }

    @Get('view')
    async view(@Query('path') path: string, @Res() res) {
        if (!path) throw new BadRequestException('Path is required');
        const url = this.documentsService.getPublicUrl(path);
        // Using 302 Found for temporary redirect as signed URLs might expire or change
        // For Public buckets, it's static, but redirect is safer.
        return res.redirect(url);
    }
}
