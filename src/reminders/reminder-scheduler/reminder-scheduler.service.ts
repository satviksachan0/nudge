import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceStatus } from 'generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReminderSchedulerService {
  private readonly logger = new Logger(ReminderSchedulerService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleReminderScan() {
    this.logger.log('Starting reminder scan');

    const today = new Date();

    const invoices = await this.prisma.invoice.findMany({
      where: {
        status: {
          in: [InvoiceStatus.PENDING, InvoiceStatus.PARTIALLY_PAID],
        },
        reminderRules: {
          some: {
            isActive: true,
          },
        },
      },
      include: {
        reminderRules: true,
        reminderLogs: true,
      },
    });

    for (const invoice of invoices) {
      const rule = invoice.reminderRules[0]; // Assuming one rule per invoice for simplicity
      const logsCount = invoice.reminderLogs.length;

      if (logsCount >= rule.maxReminders) {
        this.logger.warn(`Max reminders sent for invoice ${invoice.id}`);
        continue;
      }

      const duePlusStart = new Date(invoice.dueDate);
      duePlusStart.setDate(duePlusStart.getDate() + rule.startAfterDays);

      if (today < duePlusStart) continue;

      if (logsCount > 0) {
        const lastLog = invoice.reminderLogs[0];
        const nextEligivleDate = new Date(lastLog.sentAt);
        nextEligivleDate.setDate(
          nextEligivleDate.getDate() + rule.repeatEveryDays,
        );

        if (today < nextEligivleDate) continue;
      }

      this.logger.log(`[MOCK] Sending reminder for invoice ${invoice.id}`);
      await this.prisma.reminderLog.create({
        data: {
          invoiceId: invoice.id,
          sentAt: new Date(),
          channel: 'EMAIL',
          success: true,
          tone: 'POLITE',
          ruleId: rule.id,
        },
      });

      this.logger.log(`Reminder logged for invoice ${invoice.id}`);
    }
    this.logger.log('Reminder scan completed');
  }
}
