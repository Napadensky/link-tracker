import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.fqlh8.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=${process.env.MONGO_CLUSTER}`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
