import { CreateLinkDto } from './dto/create-link.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createLink(createLinkDto: CreateLinkDto, host: string): string {
    return 'Link created ' + createLinkDto + ' ' + host;
  }
}
