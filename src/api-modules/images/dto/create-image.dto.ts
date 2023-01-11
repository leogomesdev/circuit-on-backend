import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsHexColor } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Battle Ropes workout',
    description: 'A title to help identify the record later',
    required: true,
  })
  title: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  @Transform((param) => param.value.toUpperCase())
  @ApiProperty({
    type: 'string(HexColor)',
    example: '#FF00AA',
    description: 'Optional field for background color',
    required: false,
  })
  backgroundColor: string;

  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  @ApiProperty({
    type: 'string',
    example: 'crossfit',
    description: 'Will be converted to lower case',
    required: true,
  })
  category: string;
}
