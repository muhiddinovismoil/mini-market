import { CategoryEntity } from 'src/categroies/entities/categroy.entity';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { BaseEntity } from 'src/utils/baseEntity/baseEntity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  price: number;

  @Column({ type: 'integer', name: 'stock', default: 0 })
  stock: number;

  @Column({ type: 'varchar', name: 'image_url' })
  image_url: string;

  @Column({ type: 'uuid', name: 'category_id' })
  category_id: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ReviewEntity, (reviews) => reviews.products)
  reviews: ReviewEntity[];

  @ManyToMany(() => OrderItemEntity, (orderitem) => orderitem.products)
  @JoinTable({ name: 'order_items' })
  ordersItems: OrderItemEntity[];
}
