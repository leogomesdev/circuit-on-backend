import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class ScheduleDocument {
  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  backgroundColor?: string;

  @Prop()
  scheduledTime: Date;

  @Prop()
  data: string;
}

export type Schedule = ScheduleDocument & Document;

export const scheduleSchema = SchemaFactory.createForClass(ScheduleDocument);
