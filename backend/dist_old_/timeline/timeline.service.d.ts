import { PrismaService } from '../prisma/prisma.service';
import { TimelineEvent } from '@prisma/client';
export declare class TimelineService {
    private prisma;
    constructor(prisma: PrismaService);
    create(leadId: string, data: any): Promise<TimelineEvent>;
    remove(id: string): Promise<TimelineEvent>;
    update(id: string, data: any): Promise<TimelineEvent>;
}
