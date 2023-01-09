import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { Db } from 'mongodb';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';
import { MockFactory } from '../../test/mock.factory';

describe('ImagesService', () => {
  let service: ImagesService;
  let db: Db;
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
        ImagesService,
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

    service = module.get<ImagesService>(ImagesService);
    db = module.get<Db>(Db);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const expectedResults: Image[] = [];
    for (let i = 0; i < 3; i++) {
      expectedResults.push(MockFactory.image());
    }

    it('returns data from db.find()', async () => {
      findToArrayMockResponse = expectedResults;

      const result = await service.findAll();

      expect(result).toEqual(expectedResults);
    });
  });
});
