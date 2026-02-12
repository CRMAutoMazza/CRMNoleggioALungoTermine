import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    create(@Body() createLeadDto: any) {
        console.log('[API] POST /leads payload:', JSON.stringify(createLeadDto, null, 2));
        return this.leadsService.create(createLeadDto);
    }

    @Post('sync')
    sync() {
        return this.leadsService.syncLeads();
    }

    // @UseGuards(JwtAuthGuard) // Disabled to prevent JWKS fetch hang
    @Get()
    findAll(@Query('tenantId') tenantId: string, @Query('status') status: string) {
        console.log(`[API] GET /leads request received. Tenant: ${tenantId}, Status: ${status}`);
        return this.leadsService.findAll(tenantId, status);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.leadsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLeadDto: any) {
        return this.leadsService.update(id, updateLeadDto);
    }

    @Post('import-csv')
    @UseInterceptors(FileInterceptor('file'))
    async importCsv(@UploadedFile() file: any) {
        console.log('[API] POST /leads/import-csv received');
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        return this.leadsService.importCsv(file.buffer);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        console.log(`[API] DELETE /leads/${id} request received`);
        try {
            const result = await this.leadsService.remove(id);
            console.log(`[API] DELETE /leads/${id} SUCCESS`);
            return result;
        } catch (error) {
            console.error(`[API] DELETE /leads/${id} FAILED:`, error);
            throw error;
        }
    }
    @Post('fix-data')
    fixData() {
        return this.leadsService.fixData();
    }
}

