import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class PipelinesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.PipelineCreateInput): Promise<{
        stages: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pipelineId: string;
            color: string;
            order: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        isDefault: boolean;
    }>;
    findAll(tenantId?: string): Promise<({
        stages: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pipelineId: string;
            color: string;
            order: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        isDefault: boolean;
    })[]>;
    findOne(id: string): Promise<{
        stages: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pipelineId: string;
            color: string;
            order: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        isDefault: boolean;
    }>;
    update(id: string, data: Prisma.PipelineUpdateInput): Promise<{
        stages: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pipelineId: string;
            color: string;
            order: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        isDefault: boolean;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        isDefault: boolean;
    }>;
    createStage(data: Prisma.PipelineStageCreateInput): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        pipelineId: string;
        color: string;
        order: number;
    }>;
    updateStage(id: string, data: Prisma.PipelineStageUpdateInput): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        pipelineId: string;
        color: string;
        order: number;
    }>;
    removeStage(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        pipelineId: string;
        color: string;
        order: number;
    }>;
}
