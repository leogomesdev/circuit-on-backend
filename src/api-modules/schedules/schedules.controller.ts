import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';

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

  @Get(':_id')
  findOne(@Param('_id', ParseObjectIdPipe) _id: ObjectId): Promise<Schedule> {
    return this.schedulesService.findOne(_id);
  }

  @Delete(':_id')
  remove(@Param('_id', ParseObjectIdPipe) _id: ObjectId): Promise<void> {
    return this.schedulesService.remove(_id);
  }
}
