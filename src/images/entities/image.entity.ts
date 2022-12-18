import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class Image {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string;

  @Expose()
  title: string;

  @Expose()
  backgroundColor!: string;

  @Expose()
  category: string;

  @Expose()
  data: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
