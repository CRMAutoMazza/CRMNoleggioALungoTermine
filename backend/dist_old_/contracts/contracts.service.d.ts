import { PrismaService } from '../prisma/prisma.service';
import { Contract } from '@prisma/client';
export declare class ContractsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(leadId: string, data: any): Promise<Contract>;
    remove(id: string): Promise<Contract>;
}
