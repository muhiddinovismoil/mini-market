import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategroyDto } from './dto/create-categroy.dto';
import { UpdateCategroyDto } from './dto/update-categroy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categroy.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class CategroiesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
  async create(createCategroyDto: CreateCategroyDto) {
    const data = await this.categoryRepo.findOne({
      where: { name: createCategroyDto.name },
    });
    if (data) {
      throw new BadRequestException(
        `Category exists with this name choose another name`,
      );
    }
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
    const allCategories = await this.categoryRepo.find({
      relations: {
        products: true,
      },
    });
    if (allCategories.length === 0) {
      throw new NotFoundException('Categories data not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'All categories fetched',
      data: allCategories,
    };
  }
  async findCategoriesWithPaginatedProducts(
    page: number = 1,
    limit: number = 5,
  ) {
    const offset = (page - 1) * limit;
    const categories = await this.categoryRepo.find();
    if (!categories.length) {
      throw new NotFoundException('Categories data not found');
    }
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const [products, total] = await this.productRepo
          .createQueryBuilder('product')
          .where('product.category_id = :category_id', {
            category_id: category.id,
          })
          .limit(limit)
          .offset(offset)
          .getManyAndCount();

        return {
          ...category,
          products,
          totalProducts: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        };
      }),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Categories with paginated products fetched',
      data: categoriesWithProducts,
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
