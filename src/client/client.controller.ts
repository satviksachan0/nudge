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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@UseGuards(JwtGuard)
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Req() req: Request, @Body() clientDto: CreateClientDto) {
    return this.clientService.createClient(req.accountId, clientDto);
  }

  @Get()
  findAllByAccount(@Req() req: Request) {
    return this.clientService.findAllByAccount(req.accountId);
  }

  @Get(':id')
  findOneById(@Req() req: Request, @Param('id') clientId: string) {
    return this.clientService.findOneById(req.accountId, clientId);
  }
}
