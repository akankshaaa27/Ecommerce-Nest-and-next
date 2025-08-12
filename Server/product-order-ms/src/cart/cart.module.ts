import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRabbitMQConsumer } from './cart-rabbitmq.consumer';


@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService, CartRabbitMQConsumer],
  controllers: [CartController],
})
export class CartModule {}
