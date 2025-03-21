import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepo.create(createProductDto);
    const saveProduct = await this.productRepo.save(newProduct);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: {
        ...saveProduct,
      },
    };
  }

  async findAll() {
    const allProducts = await this.productRepo.find({
      select: {
        id: true,
        name: true,
        description: true,
        stock: true,
        price: true,
        image_url: true,
        created_at: true,
        updated_at: true,
      },
      relations: { category: true },
    });
    if (allProducts.length === 0) {
      throw new NotFoundException('Products data not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'All Products fetched',
      data: allProducts,
    };
  }

  async findOne(id: string) {
    const getOne = await this.productRepo.findOne({ where: { id } });
    if (!getOne) {
      throw new NotFoundException('Product not found with this id');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'One Product fetched',
      data: getOne,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productData = await this.productRepo.findOne({ where: { id } });
    if (!productData) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepo.update(id, updateProductDto);
    const updatedData = await this.productRepo.findOne({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Product data updated successfully',
      data: updatedData,
    };
  }

  async remove(id: string) {
    const productData = await this.productRepo.findOne({ where: { id } });
    if (!productData) {
      throw new NotFoundException(
        'Product data not found or maybe deleted before',
      );
    }
    await this.productRepo.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product data deleted successfully',
    };
  }
}
