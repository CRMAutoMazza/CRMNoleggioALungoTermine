import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leads/:leadId/contracts')
@UseGuards(JwtAuthGuard)
export class ContractsController {
    constructor(private readonly contractsService: ContractsService) { }

    @Post()
    create(@Param('leadId') leadId: string, @Body() createDto: any) {
        return this.contractsService.create(leadId, createDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contractsService.remove(id);
    }
}
