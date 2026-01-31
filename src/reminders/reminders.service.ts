import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoicesService } from 'src/invoices/invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReminderRuleDto } from './dto/create-reminder-rule.dto';

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
        clientId: invoice.clientId,
        type: dto.type,
        isActive: dto.isActive,
        config: {}, // TODO: implement config based on dto
      },
    });
  }

  async updateRuleStatus(clientId: string, ruleId: string, isActive: boolean) {
    const rule = await this.prisma.reminderRule.findFirst({
      where: {
        id: ruleId,
        client: {
          id: clientId,
        },
      },
    });

    if (!rule) throw new NotFoundException('Reminder rule not found');

    return this.prisma.reminderRule.update({
      where: { id: ruleId },
      data: { isActive: isActive },
    });
  }
}
