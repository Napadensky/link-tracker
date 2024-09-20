import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { generateShortUrl } from '../utils/shortId';

export type LinkDocument = HydratedDocument<Link>;

export type ClicksType = {
  success: number;
  failed: number;
};

@Schema()
export class Link {
  @Prop({ default: generateShortUrl() }) id: string;

  @Prop() url: string;

  @Prop() shortUrl: string;

  @Prop() password: string;

  @Prop() expiresAt: Date;

  @Prop({ default: true }) valid: boolean;

  @Prop(
    raw({
      success: { type: Number, default: 0 },
      failed: { type: Number, default: 0 },
    }),
  )
  clicks: Record<number, number>;
}

export const LinkSchema = SchemaFactory.createForClass(Link).pre(
  'save',
  async function (next) {
    if (this.isNew) {
      this.shortUrl = generateShortUrl();
    }

    if (this.password) {
      this.password = await bcryptjs.hash(this.password, 10);
    }

    next();
  },
);
