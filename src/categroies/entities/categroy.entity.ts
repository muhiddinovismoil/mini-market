import { ProductEntity } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/utils/baseEntity/baseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', unique: true })
  name: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
