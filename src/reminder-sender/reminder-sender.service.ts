import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailOwner, ReminderProposalStatus } from 'generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { sendEmail } from './reminder-sender.mailer';

@Injectable()
export class ReminderSenderService {
  private readonly logger = new Logger(ReminderSenderService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * This Cron is rn set on functionality of only sending email.
   * note: No check for channel rn. will by default send email
   * TODO: add ability to check for channel if email or whatsapp and send accordingly
   */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async sendApprovedReminders() {
    const now = new Date();

    const proposals = await this.prisma.reminderProposal.findMany({
      where: {
        status: ReminderProposalStatus.APPROVED,
        scheduledFor: { lte: now },
      },
      include: {
        client: true,
        invoice: true,
      },
      take: 10, // safety cap
    });

    const clientIds = proposals.map((p) => p.clientId);
    const emails = await this.prisma.emailAddress.findMany({
      where: {
        ownerType: EmailOwner.CLIENT,
        ownerId: { in: clientIds },
        isPrimary: true,
        isActive: true,
      },
    });

    const emailByClientId = new Map(emails.map((e) => [e.ownerId, e.email]));

    const enrichedProposals = proposals.map((p) => ({
      ...p,
      client: {
        ...p.client,
        email: emailByClientId.get(p.clientId) ?? null,
      },
    }));

    for (const proposal of enrichedProposals) {
      try {
        const email = proposal.client.email;

        if (!email) {
          throw new Error('No client email');
        }

        if (process.env.SEND_EMAIL !== 'true') {
          console.log('SEND_EMAIL: email suppressed');
          console.log(proposal.message);
          return;
        }
        const result = await sendEmail(
          email,
          `Invoice ${proposal.invoice.invoiceNo} Reminder`,
          proposal.message,
        );

        if (!result.success) {
          throw new Error(result.error);
        }

        await this.prisma.reminderProposal.update({
          where: { id: proposal.id },
          data: {
            status: ReminderProposalStatus.SENT,
          },
        });

        this.logger.log(`Sent reminder ${proposal.id} to ${email}`);
      } catch (err: any) {
        await this.prisma.reminderProposal.update({
          where: { id: proposal.id },
          data: {
            status: ReminderProposalStatus.FAILED,
          },
        });

        this.logger.error(
          `Failed to send reminder ${proposal.id}: ${err.message}`,
        );
      }
    }
  }
}
