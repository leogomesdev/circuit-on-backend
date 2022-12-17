import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CurrentSchedule {
  @Expose()
  title: string;

  @Expose()
  type: string;

  @Expose()
  backgroundColor?: string;

  @Expose()
  scheduledAt: Date;

  @Expose()
  data: string;
}
