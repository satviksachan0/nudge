import { PrismaPg } from '@prisma/adapter-pg';
import {
  Channel,
  InvoiceStatus,
  PrismaClient,
  Tone,
} from '../generated/prisma/client';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter: pool });

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'TEMP',
    },
  });

  const client = await prisma.client.create({
    data: {
      name: 'ABC Pvt Ltd',
      phone: '9999999999',
      userId: user.id,
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNo: 'INV-001',
      amount: 25000,
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: InvoiceStatus.PENDING,
      userId: user.id,
      clientId: client.id,
      invoiceDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      pdfUrl: 'http://example.com/invoice/inv-001.pdf',
    },
  });

  await prisma.reminderRule.create({
    data: {
      tone: Tone.POLITE,
      channel: Channel.EMAIL,
      invoiceId: invoice.id,
      maxReminders: 3,
      repeatEveryDays: 7,
      startAfterDays: 2,
      isActive: true,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
