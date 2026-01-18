import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailAddressModule } from 'src/emailAddress/emailAddress.module';

@Module({
  imports: [PrismaModule, EmailAddressModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
