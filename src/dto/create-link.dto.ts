import { IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  readonly url: string;
  @IsString()
  readonly password: string;
}
