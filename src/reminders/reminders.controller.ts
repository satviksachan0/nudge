import {
  Controller,
  UseGuards,
  Post,
  Req,
  Param,
  Body,
  Patch,
  Get,
  ParseBoolPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RemindersService } from './reminders.service';
import { CreateReminderRuleDto } from './dto/create-reminder-rule.dto';

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
    return this.remindersService.createRule(req.user.userId, invoiceId, dto);
  }

  @Patch('rule/:ruleId/:isActive')
  updateRuleStatus(
    @Req() req: any,
    @Param('ruleId') ruleId: string,
    @Param('isActive', ParseBoolPipe) isActive: boolean,
  ) {
    return this.remindersService.updateRuleStatus(
      req.user.userId,
      ruleId,
      isActive,
    );
  }

  @Get('logs/:invoiceId')
  getLogs(@Req() req: any, @Param('invoiceId') invoiceId: string) {
    return this.remindersService.getReminderLogs(req.user.userId, invoiceId);
  }
}
