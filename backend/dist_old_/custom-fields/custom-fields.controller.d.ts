import { CustomFieldsService } from './custom-fields.service';
import { Prisma } from '@prisma/client';
export declare class CustomFieldsController {
    private readonly customFieldsService;
    constructor(customFieldsService: CustomFieldsService);
    create(createCustomFieldDto: Prisma.CustomFieldCreateInput): Promise<{
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
    update(id: string, updateCustomFieldDto: Prisma.CustomFieldUpdateInput): Promise<{
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
