import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export function toMongoObjectId({ value, key }): ObjectId {
  if (ObjectId.isValid(value) && new ObjectId(value).toString() === value) {
    return new ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}
