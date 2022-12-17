import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Db, InsertOneResult, WithId, Document, DeleteResult } from 'mongodb';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';

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
    const imageId: string = uuidv4();
    const data = file.buffer.toString('base64');
    const result: InsertOneResult<Document> = await this.db
      .collection(this.collectionName)
      .insertOne({
        imageId,
        ...createImageDto,
        data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    if (!result.insertedId) {
      throw new ConflictException('Error to insert document');
    }

    return this.findOne(imageId);
  }

  async findAll(): Promise<Image[]> {
    const results: WithId<Document>[] = await this.db
      .collection(this.collectionName)
      .find()
      .toArray();

    return plainToInstance(Image, [...results]);
  }

  async findOne(imageId: string): Promise<Image> {
    const result: WithId<Document> = await this.db
      .collection(this.collectionName)
      .findOne({
        imageId,
      });

    if (!result) {
      throw new NotFoundException('The specified register does not exist');
    }

    return plainToInstance(Image, { ...result });
  }

  async remove(imageId: string): Promise<void> {
    const resultSchedulesCleanUp: DeleteResult = await this.db
      .collection('schedules')
      .deleteMany({
        'image.imageId': imageId,
      });

    console.log(
      `${resultSchedulesCleanUp.deletedCount} schedules of the image with imageId: ${imageId} were removed`,
    );

    const result: DeleteResult = await this.db
      .collection(this.collectionName)
      .deleteOne({
        imageId,
      });

    if (result.deletedCount === 0) {
      throw new NotFoundException('The specified register does not exist');
    }
  }
}
