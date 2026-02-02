import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { PatchReminderDto } from './dto/approve-reminder.dto';
import { ReminderProposalService } from './reminder-proposal.service';

@UseGuards(JwtGuard)
@Controller('reminder-proposal')
export class ReminderProposalController {
  constructor(private readonly service: ReminderProposalService) {}

  @Get('pending')
  async listPending(@Req() req: Request) {
    return this.service.listPending(req.accountId);
  }

  @Patch(':id/approve')
  async approve(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: PatchReminderDto,
  ) {
    return this.service.approve(req.accountId, id, dto);
  }

  @Patch(':id/cancel')
  async cancel(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: PatchReminderDto,
  ) {
    return this.service.cancel(req.accountId, id, dto);
  }
}
