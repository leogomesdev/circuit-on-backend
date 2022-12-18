import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class CurrentSchedule {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  scheduleId: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
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
