import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Invoice } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { computeReminderDates } from './reminder-scheduler.logic';

@Injectable()
export class ReminderSchedulerService {
  private readonly logger = new Logger(ReminderSchedulerService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async generateReminderProposals() {
    this.logger.log('Running remnider proposal scheduler');

    const invoices = await this.prisma.invoice.findMany({
      where: {
        status: { notIn: ['PAID', 'CANCELLED'] },
      },
      include: {
        reminderProposals: true,
        client: {
          include: {
            reminderRules: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    for (const invoice of invoices) {
      for (const rule of invoice.client.reminderRules) {
        const dates = computeReminderDates(rule, invoice);

        for (const scheduledFor of dates) {
          const exists = invoice.reminderProposals.some(
            (p) =>
              p.ruleId === rule.id &&
              p.scheduledFor.getTime() === scheduledFor.getTime(),
          );

          if (exists) continue;

          await this.prisma.reminderProposal.create({
            data: {
              invoiceId: invoice.id,
              clientId: invoice.clientId,
              ruleId: rule.id,
              scheduledFor,
              message: buildDefaultMessage(invoice),
            },
          });

          this.logger.log(
            `Created proposal: invoice=${invoice.invoiceNo}, rule=${rule.id}, date=${scheduledFor.toISOString()}`,
          );
        }
      }
    }
  }
}
function buildDefaultMessage(invoice: Invoice) {
  return `Reminder: Invoice ${invoice.invoiceNo} for ${invoice.amount} ${invoice.currency} is pending.`;
}
