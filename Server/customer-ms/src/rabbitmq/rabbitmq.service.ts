// rabbitmq.service.ts (Publisher)
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

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
        await this.channel.sendToQueue('customer_created', Buffer.from(JSON.stringify(data)));
    }

    async publishCustomerCreatedEvent(customer: any) {
    await this.channel.assertQueue('customer_created');
    await this.channel.sendToQueue('customer_created', Buffer.from(JSON.stringify(customer)));
}
}
