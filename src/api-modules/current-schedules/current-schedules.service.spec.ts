import { Test, TestingModule } from '@nestjs/testing';
import { Db } from 'mongodb';
import { CurrentSchedule } from './entities/current-schedule.entity';
import { CurrentSchedulesService } from './current-schedules.service';
import { MockFactory } from '../../test/mock.factory';

describe('CurrentSchedulesService', () => {
  let service: CurrentSchedulesService;
  let aggregateToArrayMockResponse = [];

  const mockDb = () => {
    return {
      collection: () => {
        return {
          aggregate: () => {
            return {
              toArray: () => {
                return aggregateToArrayMockResponse;
              },
            };
          },
        };
      },
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrentSchedulesService,
        {
          provide: Db,
          useFactory: mockDb,
        },
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: mockDb,
        },
      ],
    }).compile();

    service = module.get<CurrentSchedulesService>(CurrentSchedulesService);
    db = module.get<Db>(Db);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentSchedule', () => {
    const expectedResults: CurrentSchedule[] = [];
    for (let i = 0; i < 10; i++) {
      expectedResults.push(MockFactory.currentSchedule());
    }
    const limitFutureItems = 7;

    it('returns data from db.aggregate()', async () => {
      aggregateToArrayMockResponse = expectedResults;

      const result = await service.getCurrentSchedule(limitFutureItems);

      expect(result).toEqual(expectedResults);
    });
  });
});
