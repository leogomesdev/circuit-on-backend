import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class CurrentScheduleDocument {
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

export type CurrentSchedule = CurrentScheduleDocument & Document;

export const currentScheduleSchema = SchemaFactory.createForClass(
  CurrentScheduleDocument,
);
