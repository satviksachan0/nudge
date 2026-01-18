import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InvoicesModule } from 'src/invoices/invoices.module';

@Module({
  imports: [PrismaModule, InvoicesModule],
  providers: [RemindersService],
  controllers: [RemindersController],
})
export class RemindersModule {}
