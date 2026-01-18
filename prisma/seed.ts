import {
  PrismaClient,
  InvoiceStatus,
  Tone,
  Channel,
} from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter: pool });

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
    },
  });

  const client = await prisma.client.create({
    data: {
      name: 'ABC Pvt Ltd',
      email: 'accounts@abc.com',
      phone: '9999999999',
      userId: user.id,
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNo: 'INV-001',
      amount: 25000,
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: InvoiceStatus.OVERDUE,
      userId: user.id,
      clientId: client.id,
    },
  });

  await prisma.reminderRule.create({
    data: {
      daysAfterDue: 3,
      tone: Tone.POLITE,
      channel: Channel.EMAIL,
      invoiceId: invoice.id,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
