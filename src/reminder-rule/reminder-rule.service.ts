import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateReminderRuleDto,
  ReminderRuleType,
} from './dto/create-reminder-rule.dto';
import { UpdateReminderRuleDto } from './dto/update-reminder-rule.dto';
import { validateRuleConfig } from './reminder-rule.validator';

@Injectable()
export class ReminderRuleService {
  constructor(private prisma: PrismaService) {}

  async list(clientId: string, accountId: string) {
    return this.prisma.reminderRule.findMany({
      where: {
        clientId,
        client: { accountId },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(
    clientId: string,
    accountId: string,
    dto: CreateReminderRuleDto,
  ) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        accountId,
      },
    });
    if (!client) throw new ForbiddenException();

    validateRuleConfig(dto.type, dto.config);

    return this.prisma.reminderRule.create({
      data: {
        clientId,
        type: dto.type,
        config: dto.config,
      },
    });
  }

  async update(ruleId: string, accountId: string, dto: UpdateReminderRuleDto) {
    const rule = await this.prisma.reminderRule.findFirst({
      where: {
        id: ruleId,
        client: { accountId },
      },
    });
    if (!rule) throw new ForbiddenException();

    if (dto.config) {
      validateRuleConfig(rule.type as ReminderRuleType, dto.config);
    }

    return this.prisma.reminderRule.update({
      where: { id: ruleId },
      data: dto,
    });
  }

  async delete(ruleId: string, accountId: string) {
    const rule = await this.prisma.reminderRule.findFirst({
      where: {
        id: ruleId,
        client: { accountId },
      },
    });
    if (!rule) throw new ForbiddenException();

    return this.prisma.reminderRule.delete({
      where: { id: ruleId },
    });
  }
}
