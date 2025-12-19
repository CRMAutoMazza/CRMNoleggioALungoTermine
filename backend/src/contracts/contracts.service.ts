import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Contract } from '@prisma/client';

@Injectable()
export class ContractsService {
    constructor(private prisma: PrismaService) { }

    async create(leadId: string, data: any): Promise<Contract> {
        return this.prisma.contract.create({
            data: {
                ...data,
                leadId,
                amount: parseFloat(data.amount) || 0
            }
        });
    }

    async remove(id: string): Promise<Contract> {
        return this.prisma.contract.delete({
            where: { id },
        });
    }
}
