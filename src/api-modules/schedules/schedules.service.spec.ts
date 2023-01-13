import { Test, TestingModule } from '@nestjs/testing';
import { Db } from 'mongodb';
import { Schedule } from './entities/schedule.entity';
import { SchedulesService } from './schedules.service';
import { MockFactory } from '../../test/mock.factory';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let findToArrayMockResponse = [];

  const mockDb = () => {
    return {
      collection: () => {
        return {
          find: () => {
            return {
              toArray: () => {
                return findToArrayMockResponse;
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
        SchedulesService,
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

    service = module.get<SchedulesService>(SchedulesService);
    db = module.get<Db>(Db);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const expectedResults: Schedule[] = [];
    for (let i = 0; i < 3; i++) {
      expectedResults.push(MockFactory.schedule());
    }

    it('returns data from db.find()', async () => {
      findToArrayMockResponse = expectedResults;

      const result = await service.findAll();

      expect(result).toEqual(expectedResults);
    });
  });
});
