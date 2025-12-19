import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { PrismaModule } from './prisma/prisma.module';
import { TimelineModule } from './timeline/timeline.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
    imports: [PrismaModule, LeadsModule, TimelineModule, ContractsModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
