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
    accountId: string,
    invoiceId: string,
    dto: CreateReminderRuleDto,
  ) {
    const invoice = await this.invoiceService.findOne(accountId, invoiceId);
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
}
