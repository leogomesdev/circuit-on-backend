import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Db, InsertOneResult, WithId, Document, DeleteResult } from 'mongodb';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CurrentSchedule } from './entities/current-schedule.entity';
import { Schedule } from './entities/schedule.entity';
import { BadRequestException } from '@nestjs/common';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class SchedulesService {
  private collectionName = 'schedules';
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const scheduleId: string = uuidv4();
    const { imageId, scheduledAt, ...createSchedulePartialDto } =
      createScheduleDto;

    const imageDocument: Image = plainToInstance(
      Image,
      await this.db.collection('images').findOne({
        imageId,
      }),
    );
    if (!imageDocument) {
      throw new BadRequestException('imageId must be from an existing image');
    }

    const image: {
      imageId: string;
      title: string;
      category: string;
      backgroundColor?: string;
    } = {
      imageId,
      title: imageDocument.title,
      category: imageDocument.category,
    };

    if (imageDocument.backgroundColor) {
      image.backgroundColor = imageDocument.backgroundColor;
    }

    const result: InsertOneResult<Document> = await this.db
      .collection(this.collectionName)
      .insertOne({
        scheduleId,
        ...createSchedulePartialDto,
        image,
        scheduledAt: new Date(scheduledAt),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    if (!result.insertedId) {
      throw new ConflictException('Error to insert document');
    }

    return this.findOne(scheduleId);
  }

  async findAll(): Promise<Schedule[]> {
    const results: WithId<Document>[] = await this.db
      .collection(this.collectionName)
      .find()
      .toArray();

    return plainToInstance(Schedule, [...results]);
  }

  async findFutureDocs(): Promise<Schedule[]> {
    const results: WithId<Document>[] = await this.db
      .collection(this.collectionName)
      .find({
        scheduledAt: { $gte: new Date() },
      })
      .toArray();

    return plainToInstance(Schedule, [...results]);
  }

  async getCurrentSchedule(): Promise<CurrentSchedule[]> {
    const aggregationPipeline = [
      {
        $facet: {
          previous: [
            {
              $match: {
                scheduledAt: {
                  $lte: new Date(),
                },
              },
            },
            {
              $sort: {
                scheduledAt: -1,
              },
            },
            { $limit: 1 },
          ],
          next: [
            {
              $match: {
                scheduledAt: {
                  $gte: new Date(),
                },
              },
            },
            {
              $sort: { scheduledAt: 1 },
            },
            { $limit: 7 },
          ],
        },
      },
      {
        $project: {
          currentSchedule: {
            $concatArrays: ['$previous', '$next'],
          },
        },
      },
      {
        $unwind: '$currentSchedule',
      },
      {
        $lookup: {
          from: 'images',
          localField: 'currentSchedule.image.imageId',
          foreignField: 'imageId',
          as: 'imageData',
        },
      },
      {
        $project: {
          scheduleId: '$currentSchedule.scheduleId',
          scheduledAt: '$currentSchedule.scheduledAt',
          title: {
            $first: '$imageData.title',
          },
          backgroundColor: {
            $first: '$imageData.backgroundColor',
          },
          category: {
            $first: '$imageData.category',
          },
          data: {
            $first: '$imageData.data',
          },
        },
      },
    ];

    const currentSchedules: Document[] = await this.db
      .collection(this.collectionName)
      .aggregate(aggregationPipeline)
      .toArray();

    return [...plainToInstance(CurrentSchedule, currentSchedules)];
  }

  async findOne(scheduleId: string): Promise<Schedule> {
    const result: WithId<Document> = await this.db
      .collection(this.collectionName)
      .findOne({
        scheduleId,
      });

    if (!result) {
      throw new NotFoundException('The specified register does not exist');
    }

    return plainToInstance(Schedule, { ...result });
  }

  async remove(scheduleId: string): Promise<void> {
    const result: DeleteResult = await this.db
      .collection(this.collectionName)
      .deleteOne({
        scheduleId,
      });

    if (result.deletedCount === 0) {
      throw new NotFoundException('The specified register does not exist');
    }
  }
}
