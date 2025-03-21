import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/utils/baseEntity/baseEntity';
import { RoleEnum } from 'src/utils/enums/role.enum';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'fullname' })
  fullname: string;

  @Column({ type: 'varchar', name: 'email', nullable: false })
  email: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password: string;

  @Column({ type: 'varchar', name: 'avatar' })
  avatar: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  phone_number: string;

  @Column({ type: 'varchar', name: 'address' })
  address: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];
}
