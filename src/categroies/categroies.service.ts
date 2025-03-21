import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategroyDto } from './dto/create-categroy.dto';
import { UpdateCategroyDto } from './dto/update-categroy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categroy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategroiesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}
  async create(createCategroyDto: CreateCategroyDto) {
    const newCategory = this.categoryRepo.create(createCategroyDto);
    const saveCategory = await this.categoryRepo.save(newCategory);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data: {
        ...saveCategory,
      },
    };
  }

  async findAll() {
    const allCategories = await this.categoryRepo.find();
    if (allCategories.length === 0) {
      throw new NotFoundException('Categories data not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'All categories fetched',
      data: allCategories,
    };
  }

  async findOne(id: string) {
    const getOne = await this.categoryRepo.findOne({ where: { id } });
    if (!getOne) {
      throw new NotFoundException('Category not found with this id');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'One Category fetched',
      data: getOne,
    };
  }

  async update(id: string, updateCategroyDto: UpdateCategroyDto) {
    const categoryData = await this.categoryRepo.findOne({ where: { id } });
    if (!categoryData) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepo.update(id, updateCategroyDto);
    const updatedData = await this.categoryRepo.findOne({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Category data updated successfully',
      data: updatedData,
    };
  }

  async remove(id: string) {
    const categoryData = await this.categoryRepo.findOne({ where: { id } });
    if (!categoryData) {
      throw new NotFoundException(
        'Category data not found or maybe deleted before',
      );
    }
    await this.categoryRepo.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category data deleted successfully',
    };
  }
}
