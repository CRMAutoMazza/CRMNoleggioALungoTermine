
import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OffersService {
    // Store offers in a JSON file in the Documents/AutoMazza_Data folder for persistence and consistency
    private storagePath = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Documents', 'AutoMazza_Data', 'offers.json');

    constructor() {
        this.ensureStorageExists();
    }

    private ensureStorageExists() {
        // Ensure directory exists
        const dir = path.dirname(this.storagePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Ensure file exists
        if (!fs.existsSync(this.storagePath)) {
            fs.writeFileSync(this.storagePath, JSON.stringify({ headers: [], data: [], updatedAt: new Date() }));
        }
    }

    async getOffers() {
        try {
            const content = await fs.promises.readFile(this.storagePath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            return { headers: [], data: [] };
        }
    }

    async saveOffers(headers: string[], data: any[]) {
        const payload = {
            headers,
            data,
            updatedAt: new Date().toISOString()
        };
        await fs.promises.writeFile(this.storagePath, JSON.stringify(payload, null, 2));
        return payload;
    }
}
