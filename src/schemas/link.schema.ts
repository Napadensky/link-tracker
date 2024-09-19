import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { generateShortUrl } from 'src/utils/shortId';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop({ default: generateShortUrl() }) id: string;

  @Prop() url: string;

  @Prop() shortUrl: string;

  @Prop() password: string;

  @Prop() expiresAt: Date;

  @Prop({ default: 0 }) clicks: number;

  @Prop({ default: true }) valid: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
