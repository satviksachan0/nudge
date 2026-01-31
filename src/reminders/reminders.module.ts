import { Module } from '@nestjs/common';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [PrismaModule, InvoicesModule, NotificationsModule],
  providers: [RemindersService],
  controllers: [RemindersController],
})
export class RemindersModule {}
