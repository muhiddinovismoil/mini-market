import { Module } from '@nestjs/common';
import { CategroiesService } from './categroies.service';
import { CategroiesController } from './categroies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/categroy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategroiesController],
  providers: [CategroiesService],
})
export class CategroiesModule {}
