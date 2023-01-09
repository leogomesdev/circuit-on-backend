import { Test, TestingModule } from '@nestjs/testing';
import { CurrentSchedule } from './entities/current-schedule.entity';
import { CurrentScheduleDto } from './dto/current-schedule.dto';
import { CurrentSchedulesController } from './current-schedules.controller';
import { CurrentSchedulesService } from './current-schedules.service';
import { MockFactory } from '../../test/mock.factory';

describe('CurrentSchedulesController', () => {
  let controller: CurrentSchedulesController;
  let service: CurrentSchedulesService;

  const mockCurrentSchedulesService = () => ({
    getCurrentSchedule: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentSchedulesController],
      providers: [
        {
          provide: CurrentSchedulesService,
          useFactory: mockCurrentSchedulesService,
        },
      ],
    }).compile();

    controller = module.get<CurrentSchedulesController>(
      CurrentSchedulesController,
    );
    service = module.get<CurrentSchedulesService>(CurrentSchedulesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrentSchedule', () => {
    const currentScheduleDto: CurrentScheduleDto = {
      maxFutureItems: 10,
    };

    it('calls service.getCurrentSchedule()', async () => {
      await controller.getCurrentSchedule(currentScheduleDto);

      expect(service.getCurrentSchedule).toHaveBeenCalledTimes(1);
      expect(service.getCurrentSchedule).toHaveBeenCalledWith(
        currentScheduleDto.maxFutureItems,
      );
    });

    it('returns an array of CurrentSchedule', async () => {
      const currentScheduleList: CurrentSchedule[] = [];
      for (let i = 0; i < 10; i++) {
        currentScheduleList.push(MockFactory.currentSchedule());
      }

      service.getCurrentSchedule = jest
        .fn()
        .mockResolvedValue(currentScheduleList);

      const result: CurrentSchedule[] = await controller.getCurrentSchedule(
        currentScheduleDto,
      );

      expect(result).toEqual(currentScheduleList);
    });
  });
});
