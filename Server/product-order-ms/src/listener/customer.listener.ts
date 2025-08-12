// rabbitmq.service.ts (Consumer)
import { Injectable } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private channel: Channel;

  async consume(queue: string, handler: (data: any) => void) {
    const connection = await connect('amqp://guest:guest@rabbitmq:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(queue);

    this.channel.consume(queue, msg => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        handler(content);
        this.channel.ack(msg);
      }
    });
  }
}
