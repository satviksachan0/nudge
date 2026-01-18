import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoicesService } from 'src/invoices/invoices.service';
import { CreateReminderRuleDto } from './dto/create-reminder-rule.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RemindersService {
  constructor(
    private invoiceService: InvoicesService,
    private prisma: PrismaService,
  ) {}

  async createRule(
    userId: string,
    invoiceId: string,
    dto: CreateReminderRuleDto,
  ) {
    const invoice = await this.invoiceService.findOne(userId, invoiceId);
    if (!invoice) throw new NotFoundException('Invoice not found');

    return this.prisma.reminderRule.create({
      data: {
        invoiceId: invoiceId,
        startAfterDays: dto.startAfterDays,
        repeatEveryDays: dto.repeatEveryDays,
        maxReminders: dto.maxReminders,
        tone: dto.tone,
        isActive: dto.isActive,
        channel: dto.channel,
      },
    });
  }

  async updateRuleStatus(userId: string, ruleId: string, isActive: boolean) {
    const rule = await this.prisma.reminderRule.findFirst({
      where: {
        id: ruleId,
        invoice: {
          userId: userId,
        },
      },
    });

    if (!rule) throw new NotFoundException('Reminder rule not found');

    return this.prisma.reminderRule.update({
      where: { id: ruleId },
      data: { isActive: isActive },
    });
  }

  async getReminderLogs(userId: string, invoiceId: string) {
    const invoice = await this.invoiceService.findOne(userId, invoiceId);
    if (!invoice) throw new NotFoundException('Invoice not found');

    return this.prisma.reminderLog.findMany({
      where: {
        invoiceId: invoiceId,
      },
      orderBy: {
        sentAt: 'desc',
      },
    });
  }
}
