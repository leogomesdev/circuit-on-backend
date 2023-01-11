import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ParseObjectIdPipe } from '../../pipes/parse-object-id.pipe';
import { Schedule } from './entities/schedule.entity';
import { SchedulesService } from './schedules.service';

@Controller({
  path: 'schedules',
  version: '1',
})
@UseGuards(AuthGuard('bearer'))
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiTags('schedules')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
  example: 'Bearer AAAA',
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
