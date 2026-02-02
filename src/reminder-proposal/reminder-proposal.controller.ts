import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { ApproveReminderDto } from './dto/approve-reminder.dto';
import { ReminderProposalService } from './reminder-proposal.service';

@UseGuards(JwtGuard)
@Controller('reminder-proposal')
export class ReminderProposalController {
  constructor(private readonly service: ReminderProposalService) {}

  @Get('pending')
  async listPending(@Req() req: Request) {
    return this.service.listPending(req.accountId);
  }

  @Post(':id/approve')
  async approve(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: ApproveReminderDto,
  ) {
    return this.service.approve(req.accountId, id, dto);
  }

  @Post(':id/cancel')
  async cancel(@Req() req: Request, @Param('id') id: string) {
    return this.service.cancel(req.accountId, id);
  }
}
