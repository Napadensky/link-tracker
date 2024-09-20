import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  getStatusApi(@Res() res: Response): Response {
    res.status(200).json({ status: 'OK' });
    return res;
  }
}
