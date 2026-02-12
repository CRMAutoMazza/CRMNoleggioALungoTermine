import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';

const UPLOAD_DIR = './uploads';

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR);
}

@Controller('files')
export class FilesController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: UPLOAD_DIR,
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        // Return the relative path to access the file
        // Assumes we will serve the 'uploads' folder statically
        return {
            success: true,
            url: `/uploads/${file.filename}`,
            originalName: file.originalname,
            filename: file.filename,
            path: `uploads/${file.filename}`
        };
    }

    @Get(':filename')
    serveFile(@Param('filename') filename: string, @Res() res: Response) {
        res.sendFile(filename, { root: UPLOAD_DIR });
    }
}
