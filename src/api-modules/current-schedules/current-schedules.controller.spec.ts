import { Test, TestingModule } from '@nestjs/testing';
import { CurrentSchedulesController } from './current-schedules.controller';
import { CurrentSchedulesService } from './current-schedules.service';

describe('CurrentSchedulesController', () => {
  let controller: CurrentSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentSchedulesController],
      providers: [CurrentSchedulesService],
    }).compile();

    controller = module.get<CurrentSchedulesController>(
      CurrentSchedulesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
