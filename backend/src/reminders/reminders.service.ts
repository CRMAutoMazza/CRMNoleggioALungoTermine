import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemindersService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.reminder.findMany({
            orderBy: { datetime: 'asc' },
            include: { lead: true }
        });
    }

    async create(data: any) {
        const { leadId, id, ...rest } = data; // Remove client-side ID if present
        return this.prisma.reminder.create({
            data: {
                ...rest,
                lead: { connect: { id: leadId } }
            }
        });
    }

    async update(id: string, data: any) {
        const { leadId, ...rest } = data;
        return this.prisma.reminder.update({
            where: { id },
            data: rest
        });
    }

    async remove(id: string) {
        return this.prisma.reminder.delete({
            where: { id }
        });
    }
}
