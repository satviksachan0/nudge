import { Controller, Post } from '@nestjs/common';
import { ReminderSchedulerService } from './reminder-scheduler.service';

@Controller('reminder-scheduler')
export class ReminderSchedulerController {
  constructor(private reminderSchedulerService: ReminderSchedulerService) {}

  @Post('run-scan')
  runScan() {
    return this.reminderSchedulerService.handleReminderScan();
  }
}
