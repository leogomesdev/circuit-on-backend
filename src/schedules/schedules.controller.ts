import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CurrentSchedule } from './entities/current-schedule.entity';
import { Schedule } from './entities/schedule.entity';

@Controller({
  path: 'schedules',
  version: '1',
})
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get('/future')
  findFutureSchedule(): Promise<Schedule[]> {
    return this.schedulesService.findFutureDocs();
  }

  @Get('/current')
  getCurrentSchedule(): Promise<CurrentSchedule[]> {
    return this.schedulesService.getCurrentSchedule();
  }

  @Get(':scheduleId')
  findOne(
    @Param('scheduleId', ParseUUIDPipe) scheduleId: string,
  ): Promise<Schedule> {
    return this.schedulesService.findOne(scheduleId);
  }

  @Delete(':scheduleId')
  remove(
    @Param('scheduleId', ParseUUIDPipe) scheduleId: string,
  ): Promise<void> {
    return this.schedulesService.remove(scheduleId);
  }
}
