import { Module } from '@nestjs/common';
import { EmailAddressService } from './emailAddress.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmailAddressService],
})
export class EmailAddressModule {}
