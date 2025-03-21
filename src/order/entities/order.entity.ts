import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/utils/baseEntity/baseEntity';
import { OrderStatus } from 'src/utils/enums/order-status.enum';
import { UsersEntity } from 'src/auth/entities/auth.entity';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_price' })
  total_price: number;

  @Column({
    type: 'enum',
    name: 'status',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
