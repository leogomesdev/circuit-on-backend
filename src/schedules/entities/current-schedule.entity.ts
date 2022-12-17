import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CurrentSchedule {
  @Expose()
  scheduleId: string;

  @Expose()
  imageId: string;

  @Expose()
  title: string;

  @Expose()
  category: string;

  @Expose()
  backgroundColor?: string;

  @Expose()
  scheduledAt: Date;

  @Expose()
  data: string;
}
