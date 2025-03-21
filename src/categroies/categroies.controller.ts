import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CategroiesService } from './categroies.service';
import { CreateCategroyDto } from './dto/create-categroy.dto';
import { UpdateCategroyDto } from './dto/update-categroy.dto';
import { isUUID } from 'class-validator';

@Controller('categories')
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

  @Get('/paginated')
  findWithPaginationAll() {
    return this.categroiesService.findCategoriesWithPaginatedProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.categroiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategroyDto: UpdateCategroyDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.categroiesService.update(id, updateCategroyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.categroiesService.remove(id);
  }
}
