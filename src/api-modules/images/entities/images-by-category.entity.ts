import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
class SubDocumentImage {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string;

  @Expose()
  title: string;

  @Expose()
  updatedAt: Date;
}

@Exclude()
export class ImagesByCategory {
  @Expose()
  category: string;

  @Expose()
  @Type(() => SubDocumentImage)
  images: SubDocumentImage[];
}
