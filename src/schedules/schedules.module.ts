import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { scheduleSchema } from './entities/schedule.entity';
import { SchedulesRepository } from './schedules.repository';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulesRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'schedules',
        schema: scheduleSchema,
      },
    ]),
  ],
})
export class SchedulesModule {}
