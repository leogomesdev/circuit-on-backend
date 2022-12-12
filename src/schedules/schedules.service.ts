import { Inject, Injectable } from '@nestjs/common';
import { Db, InsertOneResult } from 'mongodb';
import { plainToInstance } from 'class-transformer';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CurrentSchedule } from './interfaces/current-schedule.interface';
import { Schedule } from '../schemas/schedule.schema';

@Injectable()
export class SchedulesService {
  private collectionName = 'schedules';
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const now = new Date();

    const result: InsertOneResult<Document> = await this.db
      .collection(this.collectionName)
      .insertOne(
        {
          ...createScheduleDto,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        },
        { checkKeys: false },
      );

    return plainToInstance(Schedule, result.insertedId);
  }

  async findAll(): Promise<Schedule[]> {
    const results = await this.db
      .collection(this.collectionName)
      .find()
      .toArray();

    return plainToInstance(Schedule, results);
  }

  async getCurrentSchedule(): Promise<CurrentSchedule[]> {
    const aggPreviousLastImage = [
      {
        $match: {
          scheduledTime: {
            $lte: new Date(),
          },
        },
      },
      {
        $sort: {
          scheduledTime: -1,
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
          scheduledTime: 1,
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
          scheduledTime: {
            $gte: new Date(),
          },
        },
      },
      {
        $sort: { scheduledTime: 1 },
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
          scheduledTime: 1,
          data: {
            $first: '$data.data',
          },
          title: { $first: '$data.title' },
          title2: { $first: '$data.title' },
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
      ...plainToInstance(Schedule, lastImage),
      ...plainToInstance(Schedule, nextImages),
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule using ${updateScheduleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
