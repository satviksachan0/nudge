import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReminderSchedulerService } from './reminder-scheduler.service';

@Module({
  imports: [PrismaModule],
  providers: [ReminderSchedulerService],
})
export class ReminderSchedulerModule {}
