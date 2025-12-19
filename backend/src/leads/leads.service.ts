import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Lead, Prisma } from '@prisma/client';

@Injectable()
export class LeadsService {
    constructor(private prisma: PrismaService) { }

    async create(data: any): Promise<Lead> {
        // Separate specialized fields from dynamic 'data' (JSON)
        const { firstName, lastName, email, status, tenantId, tags, ...dynamicData } = data;

        return this.prisma.lead.create({
            data: {
                firstName,
                lastName,
                email,
                status: status || 'new',
                tenantId,
                tags: tags || [],
                data: dynamicData, // Store rest as JSON
                createdAt: new Date(),
                timeline: {
                    create: { type: 'system', description: 'Lead creato' }
                }
            },
            include: { timeline: true }
        });
    }

    async findAll(tenantId?: string): Promise<Lead[]> {
        return this.prisma.lead.findMany({
            where: tenantId ? { tenantId } : {},
            include: {
                timeline: { orderBy: { date: 'desc' } },
                contracts: true,
                practices: true,
                reminders: true,
                documents: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOne(id: string): Promise<Lead | null> {
        return this.prisma.lead.findUnique({
            where: { id },
            include: {
                timeline: { orderBy: { date: 'desc' } },
                contracts: true,
                practices: true,
                reminders: true,
                documents: true
            }
        });
    }

    async update(id: string, data: any): Promise<Lead> {
        // Handle specific updates vs dynamic data updates
        // Simple approach: merge top level fields
        const { firstName, lastName, email, status, tags, data: dynamicData, ...rest } = data;

        return this.prisma.lead.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                status,
                tags,
                data: dynamicData ? dynamicData : undefined
            },
            include: { timeline: true }
        });
    }

    async remove(id: string): Promise<Lead> {
        return this.prisma.lead.delete({
            where: { id },
        });
    }
}
