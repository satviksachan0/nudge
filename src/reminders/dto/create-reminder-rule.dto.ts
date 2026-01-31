export class CreateReminderRuleDto {
  tone: 'POLITE' | 'FIRM';
  isActive: boolean;
  type: 'BEFORE_DUE' | 'AFTER_DUE' | 'ON_DUE';
}
