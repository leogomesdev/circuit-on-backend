import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { toMongoObjectId } from '../../../transformers/to-mongo-object-id.transformer';

export class CreateScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string(ISO datetime)',
    example: '2022-12-18T18:50:00.000-0500',
    description: 'Timezone will be converted in UTC to be saved into database',
    required: true,
  })
  scheduledAt: Date;

  @IsNotEmpty()
  @Type(() => ObjectId)
  @Transform(toMongoObjectId)
  @ApiProperty({
    type: 'string(MongoDB ObjectId)',
    example: '639f1e04ed3c9d5abb90908a',
    description: 'Must be a valid value for an ObjectId',
    required: true,
  })
  imageId: ObjectId;
}
