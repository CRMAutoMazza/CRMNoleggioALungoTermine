import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomFieldsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.CustomFieldCreateInput) {
        return this.prisma.customField.create({
            data,
        });
    }

    async findAll(tenantId?: string, entityType?: string) {
        const where: Prisma.CustomFieldWhereInput = {};
        if (tenantId) where.tenantId = tenantId;
        if (entityType) where.entityType = entityType;

        return this.prisma.customField.findMany({
            where,
        });
    }

    async findOne(id: string) {
        return this.prisma.customField.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Prisma.CustomFieldUpdateInput) {
        return this.prisma.customField.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.customField.delete({
            where: { id },
        });
    }
}
