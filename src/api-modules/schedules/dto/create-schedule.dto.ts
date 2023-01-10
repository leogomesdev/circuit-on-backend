import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { toMongoObjectId } from '../../../transformers/to-mongo-object-id.transformer';

export class CreateScheduleDto {
  @IsDateString()
  @IsNotEmpty()
  scheduledAt: Date;

  @IsNotEmpty()
  @Type(() => ObjectId)
  @Transform(toMongoObjectId)
  imageId: ObjectId;
}
