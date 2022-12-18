import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CurrentScheduleDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxFutureItems = 7;
}
