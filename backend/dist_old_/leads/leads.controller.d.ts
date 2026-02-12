import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        tags: string[];
        pipelineId: string | null;
        stageId: string | null;
        tenantId: string | null;
    }>;
    sync(): Promise<any>;
    findAll(tenantId: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        tags: string[];
        pipelineId: string | null;
        stageId: string | null;
        tenantId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        tags: string[];
        pipelineId: string | null;
        stageId: string | null;
        tenantId: string | null;
    }>;
    update(id: string, updateLeadDto: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        tags: string[];
        pipelineId: string | null;
        stageId: string | null;
        tenantId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        tags: string[];
        pipelineId: string | null;
        stageId: string | null;
        tenantId: string | null;
    }>;
}
