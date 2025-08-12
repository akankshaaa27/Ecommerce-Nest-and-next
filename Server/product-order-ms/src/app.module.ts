// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'root',
//   database: 'product_order_db',
//   autoLoadEntities: true,
//   synchronize: true,
// }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // PostgreSQL config

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),

    // RabbitMQ client to communicate with Customer Microservice
    ClientsModule.register([
      {
        name: 'CUSTOMER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
          queue: 'customer_queue',
          queueOptions: { durable: false },
        },
      },
    ]),

    OrderModule,

    ProductModule,

    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
