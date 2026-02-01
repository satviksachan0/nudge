import { BadRequestException } from '@nestjs/common';
import { ReminderRuleType } from './dto/create-reminder-rule.dto';

export function validateRuleConfig(
  type: ReminderRuleType,
  config: Record<string, any>,
) {
  switch (type) {
    case ReminderRuleType.BEFORE_DUE:
      if (typeof config.daysBefore !== 'number' || config.daysBefore <= 0) {
        throw new BadRequestException('Invalid BEFORE_DUE config');
      }
      break;

    case ReminderRuleType.ON_DUE:
      if (Object.keys(config).length !== 0) {
        throw new BadRequestException('ON_DUE config must be empty');
      }
      break;

    case ReminderRuleType.AFTER_DUE:
      if (
        typeof config.startAfterDays !== 'number' ||
        typeof config.repeatEveryDays !== 'number' ||
        typeof config.maxOccurrences !== 'number'
      ) {
        throw new BadRequestException('Invalid AFTER_DUE config');
      }
      break;
  }
}
