import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { ReminderSchedulerService } from './reminder-scheduler/reminder-scheduler.service';
import { ReminderSchedulerController } from './reminder-scheduler/reminder-scheduler.controller';
import { ReminderSchedulerModule } from './reminder-scheduler/reminder-scheduler.module';

@Module({
  imports: [PrismaModule, InvoicesModule, ReminderSchedulerModule],
  providers: [RemindersService, ReminderSchedulerService],
  controllers: [RemindersController, ReminderSchedulerController],
})
export class RemindersModule {}
