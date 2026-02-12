import { Response } from 'express';
export declare class FilesController {
    uploadFile(file: Express.Multer.File): {
        success: boolean;
        url: string;
        originalName: string;
        filename: string;
        path: string;
    };
    serveFile(filename: string, res: Response): void;
}
