import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Db,
  InsertOneResult,
  WithId,
  Document,
  DeleteResult,
  ObjectId,
} from 'mongodb';
import { plainToInstance } from 'class-transformer';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { ImagesByCategory } from './entities/images-by-category.entity';

@Injectable()
export class ImagesService {
  private collectionName = 'images';
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async create(
    createImageDto: CreateImageDto,
    file: Express.Multer.File,
  ): Promise<Image> {
    const encoding: BufferEncoding = 'base64';
    const parsedImage: string = file.buffer.toString(encoding);
    const data = `data:${file.mimetype};${encoding},${parsedImage}`;
    const result: InsertOneResult<Document> = await this.db
      .collection(this.collectionName)
      .insertOne({
        ...createImageDto,
        data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    if (!result.insertedId) {
      throw new ConflictException('Error to insert document');
    }

    return this.findOne(result.insertedId);
  }

  async findAll(): Promise<Image[]> {
    const results: WithId<Document>[] = await this.db
      .collection(this.collectionName)
      .find()
      .toArray();

    return plainToInstance(Image, [...results]);
  }

  async findOne(_id: ObjectId): Promise<Image> {
    const result: WithId<Document> = await this.db
      .collection(this.collectionName)
      .findOne({ _id });

    if (!result) {
      throw new NotFoundException('The specified register does not exist');
    }

    return plainToInstance(Image, { ...result });
  }

  async getGroupedByCategory(): Promise<ImagesByCategory[]> {
    const aggregationPipeline = [
      {
        $sort: {
          category: 1,
          updatedAt: -1,
        },
      },
      {
        $group: {
          _id: '$category',
          images: {
            $push: {
              _id: '$_id',
              title: '$title',
              updatedAt: '$updatedAt',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          images: '$images',
        },
      },
      {
        $sort: {
          category: 1,
        },
      },
    ];

    const data: Document[] = await this.db
      .collection(this.collectionName)
      .aggregate(aggregationPipeline)
      .toArray();

    return [...plainToInstance(ImagesByCategory, data)];
  }

  async remove(_id: ObjectId): Promise<void> {
    const resultSchedulesCleanUp: DeleteResult = await this.db
      .collection('schedules')
      .deleteMany({
        'image._id': _id,
      });

    console.log(
      `${resultSchedulesCleanUp.deletedCount} schedules of the image with _id: ${_id} were removed`,
    );

    const result: DeleteResult = await this.db
      .collection(this.collectionName)
      .deleteOne({ _id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('The specified register does not exist');
    }
  }
}
