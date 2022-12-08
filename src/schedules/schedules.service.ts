import { Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesRepository } from './schedules.repository';
import { CurrentSchedule } from './entities/current-schedule.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @Inject(SchedulesRepository)
    private schedulesRepository: SchedulesRepository,
  ) {}
  create(createScheduleDto: CreateScheduleDto) {
    return this.schedulesRepository.create(createScheduleDto);
  }

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.findAll();
  }

  getCurrentSchedule(): Promise<CurrentSchedule[]> {
    return this.schedulesRepository.getCurrentSchedule();
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule using ${updateScheduleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
