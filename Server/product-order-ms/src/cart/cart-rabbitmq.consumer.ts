import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, ConsumeMessage } from 'amqplib';
import { CartService } from './cart.service';

@Injectable()
export class CartRabbitMQConsumer implements OnModuleInit {
  private channel: Channel;

  constructor(private readonly cartService: CartService) {}

  async onModuleInit() {
    const connection = await connect('amqp://guest:guest@rabbitmq:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('customer_created');

    this.channel.consume('customer_created', async (msg: ConsumeMessage | null) => {
      if (msg) {
        const customer = JSON.parse(msg.content.toString());
        console.log('📩 Received from customer_created:', customer);
        const productId = 1
        const quantity = 2
        // Automatically create a cart for the customer
        await this.cartService.create({ customerId: customer.id, productId:1, quantity:2});

        // ✅ Acknowledge message
        this.channel.ack(msg);
      }
    });
  }
}
