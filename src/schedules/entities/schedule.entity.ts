import { Exclude, Expose } from 'class-transformer';

class SubDocumentImageDto {
  @Expose()
  imageId: string;

  @Expose()
  title: string;

  @Expose()
  category: string;

  @Expose()
  backgroundColor?: string;
}

@Exclude()
export class Schedule {
  @Expose()
  scheduleId: string;

  @Expose()
  image: SubDocumentImageDto;

  @Expose()
  scheduledAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
