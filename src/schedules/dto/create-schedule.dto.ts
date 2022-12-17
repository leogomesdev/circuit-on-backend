import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class SubDocumentImageDto {
  @IsUUID()
  @IsNotEmpty()
  imageId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  backgroundColor: string;
}

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledAt: Date;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => SubDocumentImageDto)
  image: SubDocumentImageDto;
}
