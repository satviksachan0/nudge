import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health.controller';
import { AuthModule } from './auth/auth.module';
import { TestController } from './test/test.controller';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, InvoicesModule],
  controllers: [AppController, HealthController, TestController],
  providers: [AppService],
})
export class AppModule {}
