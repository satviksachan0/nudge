import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReminderProposalController } from './reminder-proposal.controller';
import { ReminderProposalService } from './reminder-proposal.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReminderProposalController],
  providers: [ReminderProposalService],
})
export class ReminderProposalModule {}
