import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    ConfigService,
    {
      inject: [ConfigService],
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
          const client = await MongoClient.connect(
            configService.get<string>('database.host'),
            {},
          );
          return client.db(configService.get<string>('database.name'));
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
