import { Controller, Get, Query } from '@nestjs/common';
import { CurrentSchedulesService } from './current-schedules.service';
import { CurrentScheduleDto } from './dto/current-schedule.dto';
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
  getCurrentSchedule(
    @Query() currentScheduleDto: CurrentScheduleDto,
  ): Promise<CurrentSchedule[]> {
    return this.currentSchedulesService.getCurrentSchedule(
      currentScheduleDto.maxFutureItems,
    );
  }
}
