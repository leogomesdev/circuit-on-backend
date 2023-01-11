import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentSchedulesService } from './current-schedules.service';
import { CurrentScheduleDto } from './dto/current-schedule.dto';
import { CurrentSchedule } from './entities/current-schedule.entity';

@Controller({
  path: 'current-schedules',
  version: '1',
})
@ApiTags('current-schedules')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
  example: 'Bearer AAAA',
})
export class CurrentSchedulesController {
  constructor(
    private readonly currentSchedulesService: CurrentSchedulesService,
  ) {}

  @Get()
  @ApiQuery({ name: 'maxFutureItems', required: false })
  getCurrentSchedule(
    @Query() currentScheduleDto: CurrentScheduleDto,
  ): Promise<CurrentSchedule[]> {
    return this.currentSchedulesService.getCurrentSchedule(
      currentScheduleDto.maxFutureItems,
    );
  }
}
