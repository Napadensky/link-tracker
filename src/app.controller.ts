import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { CreateLinkDto } from './dto/create-link.dto';
import * as bcryptjs from 'bcryptjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(@Res() res: Response): Response {
    res.status(200).json({ status: 'OK' });
    return res;
  }

  @Post('create')
  async createLink(
    @Res() res: Response,
    @Body() createLinkDto: CreateLinkDto,
    @Req() req: any,
  ): Promise<Response> {
    // start craeteLink controller method
    const createLinkDtoClone = {
      ...createLinkDto,
      password: await bcryptjs.hash(createLinkDto.password, 10),
    };

    const newDocument = await this.appService.createLink(createLinkDtoClone);

    res.status(201).json({
      link: `${req.protocol}://${req.get('host')}/l/${newDocument.id}`,
      target: createLinkDto.url,
    });

    return res;
  }

  @Get('l/:id')
  async redirectLink(
    @Param('id') id: string,
    @Query('password') query: string,
    @Res() res: Response,
  ): Promise<Response> {
    // start redirectLink controller method

    try {
      const data: any = await this.appService.findOne(id);
      const isExpired = new Date(data?.expiresAt) < new Date();
      const isPasswordValid = await bcryptjs.compare(query, data.password);

      if (!data) throw new Error('Link not found');
      if (!data.valid) {
        data.clicks.failed += 1;
        await this.appService.updateOne(id, data);

        throw new Error('Link not found');
      }
      if (isExpired) {
        data.clicks.failed += 1;
        data.valid = false;

        await this.appService.updateOne(id, data);
        throw new Error('Link not found');
      }
      if (data.password != query && !isPasswordValid) {
        data.clicks.failed += 1;
        await this.appService.updateOne(id, data);

        throw new Error('Link not found');
      }

      data.clicks.success += 1;

      await this.appService.updateOne(id, data);

      res
        .set('cache-control', 'no-store')
        .redirect(301, `${data.url}?t=${Date.now()}`);
      return res;
    } catch (error) {
      return res.send(
        `
          <body style="display: grid;align-content: center;justify-content: center;text-align: center;">
            <div><h1>Link not found</h1></div>
            <div><h1>404</h1></div>
            <div><h1>${error}</h1></div>
          </body>
        `,
      );
    }
  }

  @Put('l/:id')
  async invalidLink(@Param('id') id: string, @Res() res): Promise<Response> {
    // start invalidLink controller method
    try {
      const data = await this.appService.updateOne(id, { valid: false });
      if (!data) throw new Error('Link not found');
      res.status(200).json({ message: 'Link invalid', data });
      return res;
    } catch (error) {
      res.status(404).json({ message: error.message });
      return res;
    }
  }

  @Get('l/:id/stats')
  async statusLink(@Param('id') id: string, @Res() res): Promise<Response> {
    // start statusLink controller method
    try {
      const data = await this.appService.findOne(id);
      if (!data) throw new Error('Link not found');
      const { success, failed } = data.clicks;
      res
        .status(200)
        .json({ stats: { success, failed, total: success + failed } });
      return res;
    } catch (error) {
      res.status(404).json({ message: error.message });
      return res;
    }
  }
}
