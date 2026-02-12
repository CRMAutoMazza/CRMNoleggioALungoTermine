import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { Prisma } from '@prisma/client';

@Controller('pipelines')
export class PipelinesController {
    constructor(private readonly pipelinesService: PipelinesService) { }

    @Post()
    create(@Body() createPipelineDto: Prisma.PipelineCreateInput) {
        return this.pipelinesService.create(createPipelineDto);
    }

    @Get()
    findAll(@Query('tenantId') tenantId?: string) {
        return this.pipelinesService.findAll(tenantId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pipelinesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePipelineDto: Prisma.PipelineUpdateInput) {
        return this.pipelinesService.update(id, updatePipelineDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pipelinesService.remove(id);
    }

    @Post('stages')
    createStage(@Body() createStageDto: Prisma.PipelineStageCreateInput) {
        return this.pipelinesService.createStage(createStageDto);
    }

    @Patch('stages/:id')
    updateStage(@Param('id') id: string, @Body() updateStageDto: Prisma.PipelineStageUpdateInput) {
        return this.pipelinesService.updateStage(id, updateStageDto);
    }

    @Delete('stages/:id')
    removeStage(@Param('id') id: string) {
        return this.pipelinesService.removeStage(id);
    }
}
