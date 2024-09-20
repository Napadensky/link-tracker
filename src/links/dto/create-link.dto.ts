import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUrl, MinDate } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  readonly expiresAt: Date;
}
