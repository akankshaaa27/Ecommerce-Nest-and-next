import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService, RabbitMQService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
