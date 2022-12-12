import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [DatabaseModule],
})
export class SchedulesModule {}
