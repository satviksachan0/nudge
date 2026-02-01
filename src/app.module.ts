import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { EmailAddressModule } from './emailAddress/emailAddress.module';
import { HealthController } from './health.controller';
import { InvoicesModule } from './invoices/invoices.module';
import { EmailService } from './notifications/email/email.service';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReminderRuleModule } from './reminder-rule/reminder-rule.module';
import { ReminderSchedulerModule } from './reminder-scheduler/reminder-scheduler.module';
import { RemindersModule } from './reminders/reminders.module';
import { TestController } from './test/test.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    InvoicesModule,
    EmailAddressModule,
    ClientModule,
    RemindersModule,
    NotificationsModule,
    ReminderRuleModule,
    ReminderSchedulerModule,
    AdminModule,
  ],
  controllers: [AppController, HealthController, TestController],
  providers: [AppService, EmailService],
})
export class AppModule {}
