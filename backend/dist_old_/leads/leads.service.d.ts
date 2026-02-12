import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Lead } from '@prisma/client';
export declare class LeadsService implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    private isSyncing;
    onModuleInit(): Promise<void>;
    create(data: any): Promise<Lead>;
    findAll(tenantId?: string): Promise<Lead[]>;
    findOne(id: string): Promise<Lead | null>;
    update(id: string, data: any): Promise<Lead>;
    remove(id: string): Promise<Lead>;
    syncLeads(): Promise<any>;
}
