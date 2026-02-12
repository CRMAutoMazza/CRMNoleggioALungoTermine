import { TimelineService } from './timeline.service';
export declare class TimelineController {
    private readonly timelineService;
    constructor(timelineService: TimelineService);
    create(leadId: string, createDto: any): Promise<{
        id: string;
        type: string;
        description: string;
        date: Date;
        icon: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        leadId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        type: string;
        description: string;
        date: Date;
        icon: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        leadId: string;
    }>;
    update(id: string, updateDto: any): Promise<{
        id: string;
        type: string;
        description: string;
        date: Date;
        icon: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        leadId: string;
    }>;
}
