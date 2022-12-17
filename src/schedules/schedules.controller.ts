import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CurrentSchedule } from '../schemas/current-schedule.schema';
import { Schedule } from '../schemas/schedule.schema';

@Controller({
  path: 'schedules',
  version: '1',
})
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get('/current')
  getCurrentSchedule(): Promise<CurrentSchedule[]> {
    return this.schedulesService.getCurrentSchedule();
  }

  @Get(':scheduleId')
  findOne(@Param('scheduleId', ParseUUIDPipe) scheduleId: string) {
    return this.schedulesService.findOne(scheduleId);
  }

  @Patch(':scheduleId')
  update(
    @Param('scheduleId', ParseUUIDPipe) scheduleId: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(scheduleId, updateScheduleDto);
  }

  @Delete(':scheduleId')
  remove(@Param('scheduleId', ParseUUIDPipe) scheduleId: string) {
    return this.schedulesService.remove(scheduleId);
  }
}
