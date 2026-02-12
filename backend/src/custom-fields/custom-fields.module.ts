import { Module } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CustomFieldsController } from './custom-fields.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [CustomFieldsController],
    providers: [CustomFieldsService, PrismaService],
    exports: [CustomFieldsService],
})
export class CustomFieldsModule { }
