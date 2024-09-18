import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(@Res() res: Response): Response {
    res.status(200).json({ status: 'OK' });
    return res;
  }

  @Post('create')
  createLink(
    @Res() res: Response,
    @Body() createLinkDto: CreateLinkDto,
    @Req() req: any,
  ): Response {
    this.appService.createLink(createLinkDto, req.headers.host);
    res.status(200).json({
      data: this.appService.createLink(createLinkDto, req.headers.host),
      error: false,
      message: 'Link created',
    });
    return res;
  }

  @Get('l/:id')
  redirectLink(): string {
    return this.appService.getHello();
  }

  @Get('l/:id/status')
  statusLink(): string {
    return this.appService.getHello();
  }
}
