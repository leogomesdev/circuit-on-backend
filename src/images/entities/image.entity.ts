import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Image {
  @Expose()
  imageId: string;

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
