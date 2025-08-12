// import { Module } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { OrderController } from './order.controller';

// @Module({
//   controllers: [OrderController],
//   providers: [OrderService]
// })
// export class OrderModule {}

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Order } from './order.entity';
// import { OrderService } from './order.service';
// import { ProductController } from '../order/order.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';

// @Module({
//   imports: [
//     // ✅ This line is CRUCIAL
//     TypeOrmModule.forFeature([Order]),

//     // ✅ Optional: RabbitMQ Client
//     ClientsModule.register([
//       {
//         name: 'CUSTOMER_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqp://localhost:5672'],
//           queue: 'customer_queue',
//           queueOptions: { durable: false },
//         },
//       },
//     ]),
//   ],
//   controllers: [ProductController],
//   providers: [OrderService],
//   exports: [OrderService],
// })
// export class OrderModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from '../order/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
