import { InvoiceStatus } from 'generated/prisma/browser';

export class CreateInvoiceDto {
  clientId: string;
  invoiceNumber: string;
  amount: number;
  currency?: string;
  invoiceDate: Date;
  dueDate: Date;
  pdfUrl?: string;
  status: InvoiceStatus;
}
