import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
    constructor(private readonly remindersService: RemindersService) { }

    @Get()
    findAll() {
        return this.remindersService.findAll();
    }

    @Post()
    create(@Body() createDto: any) {
        return this.remindersService.create(createDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.remindersService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.remindersService.remove(id);
    }
}
