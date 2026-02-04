-- AlterEnum
ALTER TYPE "ReminderProposalStatus" ADD VALUE 'FAILED';

-- CreateIndex
CREATE INDEX "ReminderProposal_status_scheduledFor_idx" ON "ReminderProposal"("status", "scheduledFor");
