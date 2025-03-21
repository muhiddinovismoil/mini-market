import { IsString } from 'class-validator';

export class CreateCategroyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
