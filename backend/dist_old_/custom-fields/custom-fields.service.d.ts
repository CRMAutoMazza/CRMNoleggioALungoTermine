import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CustomFieldsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.CustomFieldCreateInput): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        type: string;
        options: Prisma.JsonValue | null;
        key: string;
        entityType: string;
    }>;
    findAll(tenantId?: string, entityType?: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        type: string;
        options: Prisma.JsonValue | null;
        key: string;
        entityType: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        type: string;
        options: Prisma.JsonValue | null;
        key: string;
        entityType: string;
    }>;
    update(id: string, data: Prisma.CustomFieldUpdateInput): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        type: string;
        options: Prisma.JsonValue | null;
        key: string;
        entityType: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        type: string;
        options: Prisma.JsonValue | null;
        key: string;
        entityType: string;
    }>;
}
