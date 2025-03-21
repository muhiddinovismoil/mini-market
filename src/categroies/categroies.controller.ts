import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategroiesService } from './categroies.service';
import { CreateCategroyDto } from './dto/create-categroy.dto';
import { UpdateCategroyDto } from './dto/update-categroy.dto';

@Controller('categroies')
export class CategroiesController {
  constructor(private readonly categroiesService: CategroiesService) {}

  @Post()
  create(@Body() createCategroyDto: CreateCategroyDto) {
    return this.categroiesService.create(createCategroyDto);
  }

  @Get()
  findAll() {
    return this.categroiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categroiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategroyDto: UpdateCategroyDto,
  ) {
    return this.categroiesService.update(id, updateCategroyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categroiesService.remove(id);
  }
}
