import MongoSchema from 'src/shared/mongo.schema';

export class Schedule extends MongoSchema {
  title: string;
  type: string;
  backgroundColor?: string;
  scheduledTime: Date;
  data: string;
}
