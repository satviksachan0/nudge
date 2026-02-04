import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReminderSenderService } from './reminder-sender.service';

@Module({
  imports: [PrismaModule],
  providers: [ReminderSenderService],
  exports: [ReminderSenderService],
})
export class ReminderSenderModule {}
