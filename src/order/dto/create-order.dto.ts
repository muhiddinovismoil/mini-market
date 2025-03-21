import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/utils/enums/order-status.enum';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsNumber()
  total_price: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;
}
