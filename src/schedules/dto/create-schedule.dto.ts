import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  scheduledAt: Date;

  @IsUUID()
  @IsNotEmpty()
  imageId: string;
}
