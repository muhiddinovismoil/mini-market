import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepo: Repository<OrderItemEntity>,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto) {
    const newOrderItem = this.orderItemRepo.create(createOrderItemDto);
    const saveOrderItem = await this.orderItemRepo.save(newOrderItem);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'OrderItem created successfully',
      data: {
        ...saveOrderItem,
      },
    };
  }

  async findAll() {
    const allOrderItem = await this.orderItemRepo.find();
    if (allOrderItem.length === 0) {
      throw new NotFoundException('OrderItems data not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'All orderitems fetched',
      data: allOrderItem,
    };
  }

  async findOne(id: string) {
    const getOne = await this.orderItemRepo.findOne({ where: { id } });
    if (!getOne) {
      throw new NotFoundException('OrderItem not found with this id');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'One OrderItem fetched',
      data: getOne,
    };
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItemData = await this.orderItemRepo.findOne({ where: { id } });
    if (!orderItemData) {
      throw new NotFoundException('OrderItem not found');
    }
    await this.orderItemRepo.update(id, updateOrderItemDto);
    const updatedData = await this.orderItemRepo.findOne({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'OrderItem data updated successfully',
      data: updatedData,
    };
  }

  async remove(id: string) {
    const orderItemData = await this.orderItemRepo.findOne({ where: { id } });
    if (!orderItemData) {
      throw new NotFoundException(
        'OrderItem data not found or maybe deleted before',
      );
    }
    await this.orderItemRepo.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'OrderItem data deleted successfully',
    };
  }
}
