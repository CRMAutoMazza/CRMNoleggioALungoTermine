import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TimelineEvent } from '@prisma/client';

@Injectable()
export class TimelineService {
    constructor(private prisma: PrismaService) { }

    async create(leadId: string, data: any): Promise<TimelineEvent> {
        return this.prisma.timelineEvent.create({
            data: {
                ...data,
                leadId,
                date: new Date() // Always use server time for order correctness or accept client date? Client date is better for 'past' events.
                // Let's rely on data.date if present, else now.
            }
        });
    }

    async remove(id: string): Promise<TimelineEvent> {
        return this.prisma.timelineEvent.delete({
            where: { id },
        });
    }

    async update(id: string, data: any): Promise<TimelineEvent> {
        return this.prisma.timelineEvent.update({
            where: { id },
            data
        });
    }
}
