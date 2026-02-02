import { IsOptional, IsString } from 'class-validator';

export class ApproveReminderDto {
  @IsOptional()
  @IsString()
  message?: string;
}
