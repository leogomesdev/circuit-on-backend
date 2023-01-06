import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CurrentSchedulesModule } from './api-modules/current-schedules/current-schedules.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './api-modules/images/images.module';
import { SchedulesModule } from './api-modules/schedules/schedules.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CurrentSchedulesModule,
    DatabaseModule,
    ImagesModule,
    SchedulesModule,
  ],
})
export class AppModule {}
