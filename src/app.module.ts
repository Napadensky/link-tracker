import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { Link, LinkSchema } from './links/schemas/link.schema';
import { LinksModule } from './links/links.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LinksModule,
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  controllers: [AppController],
  exports: [DatabaseModule, LinksModule],
})
export class AppModule {}
