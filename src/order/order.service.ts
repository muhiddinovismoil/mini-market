import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepo.create(createOrderDto);
    const saveOrder = await this.orderRepo.save(newOrder);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: {
        ...saveOrder,
      },
    };
  }

  async findAll() {
    const allOrders = await this.orderRepo.find();
    if (allOrders.length === 0) {
      throw new NotFoundException('Orders data not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'All orders fetched',
      data: allOrders,
    };
  }

  async findOne(id: string) {
    const getOne = await this.orderRepo.findOne({ where: { id } });
    if (!getOne) {
      throw new NotFoundException('Order not found with this id');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'One Order fetched',
      data: getOne,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const orderData = await this.orderRepo.findOne({ where: { id } });
    if (!orderData) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepo.update(id, updateOrderDto);
    const updatedData = await this.orderRepo.findOne({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Order data updated successfully',
      data: updatedData,
    };
  }

  async remove(id: string) {
    const orderData = await this.orderRepo.findOne({ where: { id } });
    if (!orderData) {
      throw new NotFoundException(
        'Order data not found or maybe deleted before',
      );
    }
    await this.orderRepo.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order data deleted successfully',
    };
  }
}
