import { Controller, Get } from '@nestjs/common';
import { CurrentSchedulesService } from './current-schedules.service';
import { CurrentSchedule } from './entities/current-schedule.entity';

@Controller({
  path: 'current-schedules',
  version: '1',
})
export class CurrentSchedulesController {
  constructor(
    private readonly currentSchedulesService: CurrentSchedulesService,
  ) {}

  @Get()
  getCurrentSchedule(): Promise<CurrentSchedule[]> {
    return this.currentSchedulesService.getCurrentSchedule();
  }
}
