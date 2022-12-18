import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulesModule } from './schedules/schedules.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './images/images.module';
import { CurrentSchedulesModule } from './current-schedules/current-schedules.module';
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
