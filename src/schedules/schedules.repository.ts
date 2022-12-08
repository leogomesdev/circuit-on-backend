import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CurrentSchedule } from './entities/current-schedule.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesRepository {
  constructor(
    @InjectModel('schedules')
    private readonly scheduleModel: Model<Schedule>,
  ) {}

  async create(data: CreateScheduleDto): Promise<Schedule> {
    const now = new Date();

    return await this.scheduleModel.create({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleModel.find();
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
        },
      },
    ];

    const lastImage: CurrentSchedule[] = await this.scheduleModel.aggregate(
      aggPreviousLastImage,
    );

    const nextImages: CurrentSchedule[] = await this.scheduleModel.aggregate(
      aggNextImages,
    );

    return [...lastImage, ...nextImages];
  }
}
