import { Exclude, Expose } from 'class-transformer';

class SubDocumentImageDto {
  @Expose()
  imageId: string;

  @Expose()
  title: string;

  @Expose()
  backgroundColor: string;
}

@Exclude()
export class Schedule {
  @Expose()
  scheduleId: string;

  @Expose()
  type: string;

  @Expose()
  image: SubDocumentImageDto;

  @Expose()
  scheduledAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
