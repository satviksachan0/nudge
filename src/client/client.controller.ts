import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@UseGuards(JwtGuard)
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Req() req: any, @Body() clientDto: CreateClientDto) {
    return this.clientService.createClient(req.user.userId, clientDto);
  }
}
