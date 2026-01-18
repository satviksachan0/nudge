import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceStatus } from 'generated/prisma/enums';
import { EmailService } from 'src/notifications/email/email.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReminderSchedulerService {
  private readonly logger = new Logger(ReminderSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

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

      const emails = await this.prisma.emailAddress.findMany({
        where: {
          ownerType: 'CLIENT',
          ownerId: invoice.clientId,
          isActive: true,
          isPrimary: true,
        },
      });

      if (emails.length === 0) {
        this.logger.warn(`No email found for client ${invoice.clientId}`);
        continue;
      }

      const subject = `Reminder: Invoice ${invoice.id} is due`;
      const text = `
Hi there,

This is a gentle reminder that invoice ${invoice.id}
amounting to ${invoice.amount} is overdue.

Please let us know once payment is done.

Regards,
Nudge
`;

      let status: boolean = true;
      const emailResult = await this.emailService.sendReminder(
        emails[0].email,
        subject,
        text,
      );

      if (!emailResult.sucess) {
        status = false;
        this.logger.error(
          `Failed to send reminder for invoice ${invoice.id}: ${emailResult.error}`,
        );
      }

      await this.prisma.reminderLog.create({
        data: {
          invoiceId: invoice.id,
          sentAt: new Date(),
          channel: 'EMAIL',
          success: status,
          tone: 'POLITE',
          ruleId: rule.id,
        },
      });

      this.logger.log(`Reminder logged for invoice ${invoice.id}`);
    }
    this.logger.log('Reminder scan completed');
  }
}
