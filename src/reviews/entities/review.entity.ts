import { UsersEntity } from 'src/auth/entities/auth.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/utils/baseEntity/baseEntity';
import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column({ type: 'uuid', name: 'product_id' })
  product_id: string;

  @Column({ type: 'integer', name: 'rating', default: 1 })
  @Check(`rating BETWEEN 1 AND 5`)
  rating: number;

  @Column({ type: 'text', name: 'comment' })
  comment: string;

  @ManyToOne(() => ProductEntity, (products) => products.reviews)
  @JoinColumn({ name: 'product_id' })
  products: ProductEntity;

  @ManyToOne(() => UsersEntity, (user) => user.reviews)
  user: UsersEntity;
}
