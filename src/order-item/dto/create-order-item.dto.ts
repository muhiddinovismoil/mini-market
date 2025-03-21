import { IsNumber, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsOptional()
  order_id: string;

  @IsString()
  @IsOptional()
  product_id: string;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}
