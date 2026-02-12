import { ContractsService } from './contracts.service';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    create(leadId: string, createDto: any): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        leadId: string;
        title: string;
        amount: number;
        startDate: Date | null;
        endDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        leadId: string;
        title: string;
        amount: number;
        startDate: Date | null;
        endDate: Date;
    }>;
}
