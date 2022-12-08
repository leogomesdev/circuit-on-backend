import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  backgroundColor!: string;

  scheduledTime: Date;

  @IsString()
  @IsNotEmpty()
  data: string;
}
