import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReminderRuleController } from './reminder-rule.controller';
import { ReminderRuleService } from './reminder-rule.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReminderRuleController],
  providers: [ReminderRuleService],
})
export class ReminderRuleModule {}
