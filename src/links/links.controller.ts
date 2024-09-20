import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  Query,
  Put,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { ClicksType } from './schemas/link.schema';
@Controller('l')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('create')
  async createLink(
    @Res() res: Response,
    @Body() createLinkDto: CreateLinkDto,
    @Req() req: any,
  ): Promise<Response> {
    try {
      const newDocument = await this.linksService.createLink(createLinkDto);

      res.status(201).json({
        link: `${req.protocol}://${req.get('host')}/l/${newDocument.id}`,
        target: createLinkDto.url,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    return res;
  }

  @Get(':id')
  async redirectLink(
    @Param('id') id: string,
    @Query('password') query: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data: any = await this.linksService.findOne(id);
      const isExpired = new Date(data?.expiresAt) < new Date();
      const isPasswordValid = await bcryptjs.compare(query, data.password);

      if (!data) throw new Error('Link not found');
      if (!data.valid) {
        data.clicks.failed += 1;
        await this.linksService.updateOne(id, data);

        throw new Error('Link not found');
      }
      if (isExpired) {
        data.clicks.failed += 1;
        data.valid = false;

        await this.linksService.updateOne(id, data);
        throw new Error('Link not found');
      }
      if (data.password != query && !isPasswordValid) {
        data.clicks.failed += 1;
        await this.linksService.updateOne(id, data);

        throw new Error('Link not found');
      }

      data.clicks.success += 1;

      await this.linksService.updateOne(id, data);

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

  @Put(':id')
  async invalidLink(
    @Param('id') id: string,
    @Query('password') query: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const data = await this.linksService.updateOne(id, { valid: false });
      if (!data) throw new Error('Link not found');

      const isPasswordValid = await bcryptjs.compare(query, data?.password);
      if (data?.password != query && !isPasswordValid) {
        throw new Error('Link not found');
      }

      res.status(200).json({ message: 'Link invalid', data });
      return res;
    } catch (error) {
      res.status(404).json({ message: error.message });
      return res;
    }
  }

  @Get(':id/stats')
  async statusLink(@Param('id') id: string, @Res() res): Promise<Response> {
    try {
      const data = await this.linksService.findOne(id);
      if (!data) throw new Error('Link not found');
      const { success, failed } = data.clicks as ClicksType;
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
