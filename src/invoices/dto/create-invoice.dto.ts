export class CreateInvoiceDto {
  clientId: string;
  invoiceNumber: string;
  amount: number;
  currency?: string;
  invoiceDate: Date;
  dueDate: Date;
  pdfUrl?: string;
}
