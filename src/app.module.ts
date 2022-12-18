import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchedulesModule } from './api-modules/schedules/schedules.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './api-modules/images/images.module';
import { CurrentSchedulesModule } from './api-modules/current-schedules/current-schedules.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SchedulesModule,
    DatabaseModule,
    ImagesModule,
    CurrentSchedulesModule,
  ],
})
export class AppModule {}
