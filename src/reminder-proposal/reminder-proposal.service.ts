import { Injectable, NotFoundException } from '@nestjs/common';
import { ReminderProposalStatus } from 'generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { PatchReminderDto } from './dto/approve-reminder.dto';

@Injectable()
export class ReminderProposalService {
  constructor(private prisma: PrismaService) {}

  async listPending(accountId: string) {
    return this.prisma.reminderProposal.findMany({
      where: {
        status: ReminderProposalStatus.PENDING,
        client: {
          accountId,
        },
      },
      include: {
        invoice: true,
        client: true,
      },
      orderBy: {
        scheduledFor: 'asc',
      },
    });
  }

  async approve(accountId: string, proposalId: string, dto: PatchReminderDto) {
    const proposal = await this.prisma.reminderProposal.findUnique({
      where: { id: proposalId, client: { accountId } },
    });

    if (!proposal) {
      throw new NotFoundException('Reminder proposal not found');
    }

    if (proposal.status !== ReminderProposalStatus.PENDING)
      throw new Error('Proposal already processed');

    return this.prisma.reminderProposal.update({
      where: { id: proposalId },
      data: {
        status: ReminderProposalStatus.APPROVED,
        message: dto?.message ?? proposal.message,
        approvedAt: new Date(),
      },
    });
  }

  async cancel(accountId: string, proposalId: string, dto: PatchReminderDto) {
    const proposal = await this.prisma.reminderProposal.findUnique({
      where: { id: proposalId, client: { accountId } },
    });

    if (!proposal || proposal.status !== ReminderProposalStatus.PENDING)
      throw new Error('Invalid proposal state');

    return this.prisma.reminderProposal.update({
      where: { id: proposalId },
      data: {
        status: ReminderProposalStatus.CANCELLED,
        message: dto?.message ?? proposal.message,
      },
    });
  }
}
