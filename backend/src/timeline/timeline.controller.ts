import { Controller, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leads/:leadId/timeline')
@UseGuards(JwtAuthGuard)
export class TimelineController {
    constructor(private readonly timelineService: TimelineService) { }

    @Post()
    create(@Param('leadId') leadId: string, @Body() createDto: any) {
        return this.timelineService.create(leadId, createDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.timelineService.remove(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.timelineService.update(id, updateDto);
    }
}
