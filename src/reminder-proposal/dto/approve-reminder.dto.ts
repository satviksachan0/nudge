import { IsOptional, IsString } from 'class-validator';

export class PatchReminderDto {
  @IsOptional()
  @IsString()
  message?: string;
}
