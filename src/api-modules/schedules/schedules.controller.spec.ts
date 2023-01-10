import { Test, TestingModule } from '@nestjs/testing';
import { MockFactory } from '../../test/mock.factory';
import { Schedule } from './entities/schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let service: SchedulesService;

  const mockSchedulesService = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findFutureDocs: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulesService,
          useFactory: mockSchedulesService,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('calls service.findAll()', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('returns an array of Schedule', async () => {
      const schedulesList: Schedule[] = [];
      for (let i = 0; i < 2; i++) {
        schedulesList.push(MockFactory.schedule());
      }

      service.findAll = jest.fn().mockResolvedValue(schedulesList);

      const result: Schedule[] = await controller.findAll();

      expect(result).toEqual(schedulesList);
    });
  });
});
