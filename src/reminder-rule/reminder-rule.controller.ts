import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateReminderRuleDto } from './dto/create-reminder-rule.dto';
import { UpdateReminderRuleDto } from './dto/update-reminder-rule.dto';
import { ReminderRuleService } from './reminder-rule.service';

@UseGuards(JwtGuard)
@Controller('reminder-rule')
export class ReminderRuleController {
  constructor(private readonly reminderRuleService: ReminderRuleService) {}

  @Get('clients/:clientId/reminder-rules')
  list(@Param('clientId') clientId: string, @Req() req: Request) {
    return this.reminderRuleService.list(clientId, req.accountId);
  }

  @Post('/clients/:clientId/reminder-rules')
  create(
    @Param('clientId') clientId: string,
    @Body() dto: CreateReminderRuleDto,
    @Req() req: Request,
  ) {
    return this.reminderRuleService.create(clientId, req.accountId, dto);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReminderRuleDto,
    @Req() req: Request,
  ) {
    return this.reminderRuleService.update(id, req.accountId, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Req() req: Request) {
    return this.reminderRuleService.delete(id, req.accountId);
  }
}
