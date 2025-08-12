// import { Injectable } from '@nestjs/common';
// import { RabbitMQService } from '../../../customer-ms/src/rabbitmq/rabbitmq.service';
// import { CustomerDto } from '../../../customer-ms/src/customer/dto/customer.dto';

// @Injectable()
// export class CustomerService {
//   constructor(
//     private readonly rabbitMQService: RabbitMQService
//   ) {}

//   async CustomerDto(dto: CustomerDto) {
//     const customer = await this.repo.save(dto);
//     await this.rabbitMQService.publishCustomerCreated(customer);
//     return customer;
//   }
// }


import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, connect } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel: Channel;

  async onModuleInit() {
    const connection = await connect('amqp://guest:guest@rabbitmq:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('customer_created');
  }

  async publishCustomerCreated(data: any) {
    this.channel.sendToQueue('customer_created', Buffer.from(JSON.stringify(data)));
  }
}
