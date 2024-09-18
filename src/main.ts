import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { PORT_APP } from './constants/constants';
import { ValidationPipe } from '@nestjs/common';
import { CORS_OPTIONS } from './constants/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(CORS_OPTIONS);

  const PORT = configService.get(PORT_APP);

  await app.listen(PORT || 3001);
}

bootstrap();
