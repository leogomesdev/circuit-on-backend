import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Db, Document } from 'mongodb';
import { CurrentSchedule } from './entities/current-schedule.entity';

@Injectable()
export class CurrentSchedulesService {
  private collectionName = 'schedules';
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}
  async getCurrentSchedule(
    limitFutureItems: number,
  ): Promise<CurrentSchedule[]> {
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
            { $limit: limitFutureItems },
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
          localField: 'currentSchedule.image._id',
          foreignField: '_id',
          as: 'imageData',
        },
      },
      {
        $project: {
          scheduleId: '$currentSchedule._id',
          scheduledAt: '$currentSchedule.scheduledAt',
          imageId: {
            $first: '$imageData._id',
          },
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
}
