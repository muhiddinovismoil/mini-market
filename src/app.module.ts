import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategroiesModule } from './categroies/categroies.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: [__dirname + '/**/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: config.NODE_ENV == 'dev' ? true : false,
    }),
    AuthModule,
    CategroiesModule,
    ProductsModule,
    OrderModule,
    OrderItemModule,
    ReviewsModule,
  ],
})
export class AppModule {}
