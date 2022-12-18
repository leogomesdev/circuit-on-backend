import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
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
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { Image } from 'src/api-modules/images/entities/image.entity';
import { ImageNestedDocument } from './classes/image-nested-document.class';

@Injectable()
export class SchedulesService {
  private collectionName = 'schedules';
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { imageId, scheduledAt, ...createSchedulePartialDto } =
      createScheduleDto;

    const imageDocument: Image = plainToInstance(
      Image,
      await this.db.collection('images').findOne({ _id: imageId }),
    );
    if (!imageDocument) {
      throw new BadRequestException('imageId must be from an existing image');
    }

    const image: ImageNestedDocument = new ImageNestedDocument(
      imageId,
      imageDocument.title,
      imageDocument.category,
      imageDocument.backgroundColor,
    );

    const result: InsertOneResult<Document> = await this.db
      .collection(this.collectionName)
      .insertOne({
        ...createSchedulePartialDto,
        image,
        scheduledAt: new Date(scheduledAt),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    if (!result.insertedId) {
      throw new ConflictException('Error to insert document');
    }

    return this.findOne(result.insertedId);
  }

  async findAll(): Promise<Schedule[]> {
    const results: WithId<Document>[] = await this.db
      .collection(this.collectionName)
      .find()
      .toArray();

    console.log(results);

    return plainToInstance(Schedule, [...results]);
  }

  async findFutureDocs(): Promise<Schedule[]> {
    const results: WithId<Document>[] = await this.db
      .collection(this.collectionName)
      .find({
        scheduledAt: { $gte: new Date() },
      })
      .toArray();

    return plainToInstance(Schedule, results);
  }

  async findOne(_id: ObjectId): Promise<Schedule> {
    const result: WithId<Document> = await this.db
      .collection(this.collectionName)
      .findOne({ _id });

    if (!result) {
      throw new NotFoundException('The specified register does not exist');
    }

    return plainToInstance(Schedule, { ...result });
  }

  async remove(_id: ObjectId): Promise<void> {
    const result: DeleteResult = await this.db
      .collection(this.collectionName)
      .deleteOne({ _id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('The specified register does not exist');
    }
  }
}
