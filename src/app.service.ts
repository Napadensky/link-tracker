import { CreateLinkDto } from './dto/create-link.dto';
import { Injectable } from '@nestjs/common';
import { Link } from './schemas/link.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Link.name)
    private readonly linkModel: Model<Link>,
  ) {}

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const newDocument = await this.linkModel.create(createLinkDto);
    return newDocument;
  }

  async findOne(id: string): Promise<Link> {
    return await this.linkModel.findOne({ id });
  }

  async updateOne(id: string, data: any): Promise<Link> {
    return await this.linkModel.findOneAndUpdate({ id }, data as any, {
      new: true,
    });
  }
}
