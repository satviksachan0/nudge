import { Module } from '@nestjs/common';
import { ReminderSchedulerModule } from 'src/reminder-scheduler/reminder-scheduler.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [ReminderSchedulerModule],
  controllers: [AdminController],
})
export class AdminModule {}
