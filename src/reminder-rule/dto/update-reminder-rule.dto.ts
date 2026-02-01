import { IsBoolean, IsObject, IsOptional } from 'class-validator';

export class UpdateReminderRuleDto {
  @IsOptional()
  @IsObject()
  config?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
