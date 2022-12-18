import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  backgroundColor: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
