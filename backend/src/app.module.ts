import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { PrismaModule } from './prisma/prisma.module';
import { TimelineModule } from './timeline/timeline.module';
import { ContractsModule } from './contracts/contracts.module';

import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';
import { PipelinesModule } from './pipelines/pipelines.module';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';

import { RemindersModule } from './reminders/reminders.module';
import { DocumentsModule } from './documents/documents.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        PrismaModule,
        LeadsModule,
        TimelineModule,
        ContractsModule,
        MailModule,
        FilesModule,
        PipelinesModule,
        CustomFieldsModule,
        RemindersModule,
        DocumentsModule,
        OffersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
