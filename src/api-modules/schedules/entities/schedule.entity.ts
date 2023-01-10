import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export class SubDocumentImage {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string;

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
  @Transform(({ key, obj }) => obj[key])
  _id: string;

  @Expose()
  @Type(() => SubDocumentImage)
  image: SubDocumentImage;

  @Expose()
  scheduledAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
