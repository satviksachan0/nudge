import { Module } from '@nestjs/common';
import { EmailService } from './emailAddress.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmailService],
})
export class EmailModule {}
