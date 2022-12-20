import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsHexColor } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  @Transform((param) => param.value.toUpperCase())
  backgroundColor: string;

  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  category: string;
}
