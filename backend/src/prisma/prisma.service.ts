import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        try {
            console.log('[PRISMA] Connecting to database...');
            await this.$connect();
            console.log('[PRISMA] Database connected successfully.');
        } catch (error) {
            console.error('[PRISMA] Failed to connect to database:', error);
            // We do NOT throw here, so the app can start and we can see the logs.
            // Queries will fail later, but at least we get deployment logs.
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
