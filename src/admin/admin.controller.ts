import { Controller, ForbiddenException, Post } from '@nestjs/common';
import { ReminderSenderService } from 'src/reminder-sender/reminder-sender.service';
import { ReminderSchedulerService } from '../reminder-scheduler/reminder-scheduler.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly reminderScheduler: ReminderSchedulerService,
    private readonly reminderSender: ReminderSenderService,
  ) {}

  @Post('run-reminder-scheduler')
  async runReminderScheduler() {
    // 🔒 Safety: block in production
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'Manual cron execution disabled in production',
      );
    }

    await this.reminderScheduler.generateReminderProposals();

    return {
      success: true,
      message: 'Reminder scheduler executed',
    };
  }

  @Post('run-reminder-sender')
  async sendApprovedReminders() {
    // 🔒 Safety: block in production
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'Manual cron execution disabled in production',
      );
    }

    await this.reminderSender.sendApprovedReminders();

    return {
      success: true,
      message: 'Reminder sender executed',
    };
  }
}
