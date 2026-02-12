
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OffersService {
    constructor(private readonly prisma: PrismaService) { }

    async getOffers() {
        try {
            // Get the latest snapshot
            const snapshot = await this.prisma.offersSnapshot.findFirst({
                orderBy: { createdAt: 'desc' }
            });

            if (!snapshot) {
                return { headers: [], data: [] };
            }

            return {
                headers: snapshot.headers,
                data: snapshot.rows
            };
        } catch (error) {
            console.error('Error fetching offers:', error);
            return { headers: [], data: [] };
        }
    }

    async saveOffers(headers: string[], data: any[]) {
        try {
            // Create a new snapshot
            const snapshot = await this.prisma.offersSnapshot.create({
                data: {
                    headers: headers || [],
                    rows: data || []
                }
            });

            // Optional: Cleanup old snapshots to verify keeps only last 10
            // Not strictly necessary for MVP but good practice

            return {
                headers: snapshot.headers,
                data: snapshot.rows,
                updatedAt: snapshot.createdAt
            };
        } catch (error) {
            console.error('Error saving offers:', error);
            throw error;
        }
    }
}
