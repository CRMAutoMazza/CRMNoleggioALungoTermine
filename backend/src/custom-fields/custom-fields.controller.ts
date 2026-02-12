import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { Prisma } from '@prisma/client';

@Controller('custom-fields')
export class CustomFieldsController {
    constructor(private readonly customFieldsService: CustomFieldsService) { }

    @Post()
    create(@Body() createCustomFieldDto: Prisma.CustomFieldCreateInput) {
        return this.customFieldsService.create(createCustomFieldDto);
    }

    @Get()
    findAll(@Query('tenantId') tenantId?: string, @Query('entityType') entityType?: string) {
        return this.customFieldsService.findAll(tenantId, entityType);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customFieldsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCustomFieldDto: Prisma.CustomFieldUpdateInput) {
        return this.customFieldsService.update(id, updateCustomFieldDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customFieldsService.remove(id);
    }
}
