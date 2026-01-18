export class CreateReminderRuleDto {
  startAfterDays: number;
  repeatEveryDays: number;
  maxReminders: number;
  tone: 'POLITE' | 'FIRM';
  isActive: boolean;
  channel: 'EMAIL' | 'WHATSAPP';
}
