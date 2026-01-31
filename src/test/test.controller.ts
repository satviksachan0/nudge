import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('test')
export class TestController {
  @UseGuards(JwtGuard)
  @Get('protected')
  protected(@Req() req: Request) {
    return {
      message: 'you are authorized',
      userId: req.userId,
      accountId: req.accountId,
    };
  }
}
