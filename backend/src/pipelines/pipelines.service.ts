import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PipelinesService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.PipelineCreateInput) {
        return this.prisma.pipeline.create({
            data,
            include: { stages: true },
        });
    }

    async findAll(tenantId?: string) {
        return this.prisma.pipeline.findMany({
            where: tenantId ? { tenantId } : {},
            include: { stages: { orderBy: { order: 'asc' } } },
        });
    }

    async findOne(id: string) {
        return this.prisma.pipeline.findUnique({
            where: { id },
            include: { stages: { orderBy: { order: 'asc' } } },
        });
    }

    async update(id: string, data: Prisma.PipelineUpdateInput) {
        return this.prisma.pipeline.update({
            where: { id },
            data,
            include: { stages: true },
        });
    }

    async remove(id: string) {
        return this.prisma.pipeline.delete({
            where: { id },
        });
    }

    // Stage methods
    async createStage(data: Prisma.PipelineStageCreateInput) {
        return this.prisma.pipelineStage.create({ data });
    }

    async updateStage(id: string, data: Prisma.PipelineStageUpdateInput) {
        return this.prisma.pipelineStage.update({
            where: { id },
            data,
        });
    }

    async removeStage(id: string) {
        return this.prisma.pipelineStage.delete({
            where: { id },
        });
    }
}
