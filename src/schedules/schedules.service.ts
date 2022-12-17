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
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CurrentSchedule } from '../schemas/current-schedule.schema';
import { Schedule } from '../schemas/schedule.schema';

@Injectable()
export class SchedulesService {
  private collectionName = 'schedules';
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const scheduleId: string = uuidv4();

    const result: InsertOneResult<Document> = await this.db
      .collection(this.collectionName)
      .insertOne(
        {
          scheduleId,
          ...createScheduleDto,
          scheduledAt: new Date(createScheduleDto.scheduledAt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { checkKeys: false },
      );

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

  async getCurrentSchedule(): Promise<CurrentSchedule[]> {
    const aggPreviousLastImage = [
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
      {
        $lookup: {
          from: 'images',
          localField: 'image._id',
          foreignField: '_id',
          as: 'data',
        },
      },
      {
        $project: {
          type: 1,
          backgroundColor: 1,
          scheduledAt: 1,
          data: {
            $first: '$data.data',
          },
          title: { $first: '$data.title' },
        },
      },
    ];

    const aggNextImages = [
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
      {
        $lookup: {
          from: 'images',
          localField: 'image._id',
          foreignField: '_id',
          as: 'data',
        },
      },
      {
        $project: {
          type: 1,
          backgroundColor: 1,
          scheduledAt: 1,
          data: {
            $first: '$data.data',
          },
          title: { $first: '$data.title' },
        },
      },
    ];

    const lastImage = await this.db
      .collection(this.collectionName)
      .aggregate(aggPreviousLastImage)
      .toArray();

    const nextImages = await this.db
      .collection(this.collectionName)
      .aggregate(aggNextImages)
      .toArray();

    return [
      ...plainToInstance(CurrentSchedule, lastImage),
      ...plainToInstance(CurrentSchedule, nextImages),
    ];
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

  update(scheduleId: string, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${scheduleId} schedule using ${updateScheduleDto}`;
  }

  async remove(scheduleId: string): Promise<boolean> {
    const result: DeleteResult = await this.db
      .collection(this.collectionName)
      .deleteOne({
        scheduleId,
      });

    if (result.deletedCount === 0) {
      throw new NotFoundException('The specified register does not exist');
    }

    return true;
  }
}
