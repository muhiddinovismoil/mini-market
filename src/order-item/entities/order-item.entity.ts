import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/utils/baseEntity/baseEntity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
@Entity({ name: 'order-items' })
export class OrderItemEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'order_id' })
  order_id: string;

  @Column({ type: 'uuid', name: 'product_id' })
  product_id: string;

  @Column({ type: 'integer', name: 'quantity' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  price: number;

  @ManyToOne(() => OrderItemEntity, (orderitem) => orderitem)
  order: OrderEntity;

  @ManyToMany(() => ProductEntity, (product) => product.ordersItems)
  products: ProductEntity[];
}
