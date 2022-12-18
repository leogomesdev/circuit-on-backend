import { Test, TestingModule } from '@nestjs/testing';
import { CurrentSchedulesService } from './current-schedules.service';

describe('CurrentSchedulesService', () => {
  let service: CurrentSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentSchedulesService],
    }).compile();

    service = module.get<CurrentSchedulesService>(CurrentSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
