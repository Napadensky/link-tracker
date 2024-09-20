import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

let env = process.env.NODE_ENV || '.development';
if (process.env.NODE_ENV || 'production') env = '';

@Module({
  imports: [NestConfigModule.forRoot({ envFilePath: `.env${env}` })],
  providers: [ConfigService],
})
export class ConfigModule {}
