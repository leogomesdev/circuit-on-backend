import { Module } from '@nestjs/common';
import { CurrentSchedulesService } from './current-schedules.service';
import { CurrentSchedulesController } from './current-schedules.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CurrentSchedulesController],
  providers: [CurrentSchedulesService],
  imports: [DatabaseModule],
})
export class CurrentSchedulesModule {}
