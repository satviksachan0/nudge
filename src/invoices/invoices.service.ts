import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceStatus } from 'generated/prisma/enums';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        userId: userId,
        clientId: dto.clientId,
        invoiceNo: dto.invoiceNumber,
        amount: dto.amount,
        currency: dto.currency,
        invoiceDate: dto.invoiceDate,
        dueDate: dto.dueDate,
        pdfUrl: dto.pdfUrl,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.invoice.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, invoiceId: string) {
    const invoice = this.prisma.invoice.findFirst({
      where: { id: invoiceId, userId: userId },
    });

    if (!invoice) throw new NotFoundException('Invoice not found');

    return invoice;
  }

  async markAsPaid(userId: string, invoiceId: string) {
    const invoice = await this.findOne(userId, invoiceId);
    if (!invoice)
      throw new NotFoundException('Invoice not found, cannot mark as paid');
    return this.prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: InvoiceStatus.PAID },
    });
  }
}
