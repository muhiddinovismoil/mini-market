import { PartialType } from '@nestjs/mapped-types';
import { CreateCategroyDto } from './create-categroy.dto';

export class UpdateCategroyDto extends PartialType(CreateCategroyDto) {}
