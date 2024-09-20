import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class DatabaseModule {}
