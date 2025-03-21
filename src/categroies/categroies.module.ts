import { Module } from '@nestjs/common';
import { CategroiesService } from './categroies.service';
import { CategroiesController } from './categroies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categroy.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
  controllers: [CategroiesController],
  providers: [CategroiesService],
})
export class CategroiesModule {}
