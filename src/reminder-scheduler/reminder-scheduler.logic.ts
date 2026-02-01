import {
  Invoice,
  ReminderRule,
  ReminderRuleType,
} from 'generated/prisma/client';
import { AfterDueConfig, BeforeDueConfig } from './reminder-rule.config';

export function computeReminderDates(
  rule: ReminderRule,
  invoice: Invoice,
): Date[] {
  const dueDate = new Date(invoice.dueDate);
  const today = new Date();
  const dates: Date[] = [];

  if (rule.type === ReminderRuleType.BEFORE_DUE) {
    const config = rule.config as BeforeDueConfig;
    const d = new Date(dueDate);
    d.setDate(d.getDate() - config.daysBefore);
    if (d > today) dates.push(d);
  }

  if (rule.type === ReminderRuleType.ON_DUE) {
    if (dueDate <= today) {
      dates.push(dueDate);
    }
  }

  if (rule.type === ReminderRuleType.AFTER_DUE) {
    const config = rule.config as AfterDueConfig;
    const { startAfterDays, repeatEveryDays, maxOccurrences } = config;

    for (let i = 0; i < maxOccurrences; i++) {
      const d = new Date(dueDate);
      d.setDate(d.getDate() + startAfterDays + i * repeatEveryDays);
      if (d > today) dates.push(d);
    }
  }

  return dates;
}
