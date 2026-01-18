import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('test')
export class TestController {
  @UseGuards(JwtGuard)
  @Get('protected')
  protected(@Req() req: any) {
    return {
      message: 'you are authorized',
      user: req.user,
    };
  }
}
