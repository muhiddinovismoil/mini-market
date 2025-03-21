import { IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  user_id: string;

  @IsString()
  product_id: string;

  @IsInt()
  rating: number;

  @IsString()
  comment: string;
}
