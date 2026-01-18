import { Module } from '@nestjs/common';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReminderSchedulerController } from './reminder-scheduler/reminder-scheduler.controller';
import { ReminderSchedulerModule } from './reminder-scheduler/reminder-scheduler.module';
import { ReminderSchedulerService } from './reminder-scheduler/reminder-scheduler.service';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [
    PrismaModule,
    InvoicesModule,
    ReminderSchedulerModule,
    NotificationsModule,
  ],
  providers: [RemindersService, ReminderSchedulerService],
  controllers: [RemindersController, ReminderSchedulerController],
})
export class RemindersModule {}
