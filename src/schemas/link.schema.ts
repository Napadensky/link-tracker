import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop() url: string;

  @Prop() shortUrl: string;

  @Prop() password: string;

  @Prop() expiresAt: Date;

  @Prop({ default: 0 }) clicks: number;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
