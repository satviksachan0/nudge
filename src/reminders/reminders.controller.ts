import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateReminderRuleDto } from './dto/create-reminder-rule.dto';
import { RemindersService } from './reminders.service';

@UseGuards(JwtGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private remindersService: RemindersService) {}

  @Post('rule/:invoiceId')
  createRule(
    @Req() req: any,
    @Param('invoiceId') invoiceId: string,
    @Body() dto: CreateReminderRuleDto,
  ) {
    return this.remindersService.createRule(req.accountId, invoiceId, dto);
  }
}
