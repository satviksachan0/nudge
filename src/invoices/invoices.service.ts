import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(accountId: string, dto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        invoiceNo: dto.invoiceNumber,
        amount: dto.amount,
        currency: dto.currency,
        dueDate: dto.dueDate,
        invoiceDate: dto.invoiceDate,
        status: dto.status,
        pdfUrl: dto.pdfUrl,
        accountId: accountId,
        clientId: dto.clientId,
      },
    });
  }

  async findAll(accountId: string) {
    return this.prisma.invoice.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(accountId: string, invoiceId: string) {
    const invoice = this.prisma.invoice.findFirst({
      where: { id: invoiceId, accountId: accountId },
    });

    if (!invoice) throw new NotFoundException('Invoice not found');

    return invoice;
  }

  async markAsPaid(accountId: string, invoiceId: string) {
    const invoice = await this.findOne(accountId, invoiceId);
    if (!invoice)
      throw new NotFoundException('Invoice not found, cannot mark as paid');
    return this.prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: InvoiceStatus.PAID },
    });
  }
}
