import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  async findAll() {
    const allReviews = await this.reviewRepo.find();
    if (allReviews.length === 0) {
      throw new NotFoundException('Review data not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'All review fetched',
      data: allReviews,
    };
  }

  async findOne(id: string) {
    const getOne = await this.reviewRepo.findOne({ where: { id } });
    if (!getOne) {
      throw new NotFoundException('Review not found with this id');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'One Review fetched',
      data: getOne,
    };
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const reviewData = await this.reviewRepo.findOne({ where: { id } });
    if (!reviewData) {
      throw new NotFoundException('Review not found');
    }
    await this.reviewRepo.update(id, updateReviewDto);
    const updatedData = await this.reviewRepo.findOne({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Review data updated successfully',
      data: updatedData,
    };
  }

  async remove(id: string) {
    const reviewData = await this.reviewRepo.findOne({ where: { id } });
    if (!reviewData) {
      throw new NotFoundException(
        'Review data not found or maybe deleted before',
      );
    }
    await this.reviewRepo.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Review data deleted successfully',
    };
  }
}
