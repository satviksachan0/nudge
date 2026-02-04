import { Module } from '@nestjs/common';
import { ReminderSchedulerModule } from 'src/reminder-scheduler/reminder-scheduler.module';
import { ReminderSenderModule } from 'src/reminder-sender/reminder-sender.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [ReminderSchedulerModule, ReminderSenderModule],
  controllers: [AdminController],
})
export class AdminModule {}
