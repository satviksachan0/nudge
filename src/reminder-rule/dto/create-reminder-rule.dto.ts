import { IsEnum, IsObject } from 'class-validator';

export enum ReminderRuleType {
  BEFORE_DUE = 'BEFORE_DUE',
  ON_DUE = 'ON_DUE',
  AFTER_DUE = 'AFTER_DUE',
}

export class CreateReminderRuleDto {
  @IsEnum(ReminderRuleType)
  type: ReminderRuleType;

  @IsObject()
  config: Record<string, any>;
}
