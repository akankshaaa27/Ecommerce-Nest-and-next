import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: MongoRepository<Customer>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async create(dto: CustomerDto) {
    const customer = this.repo.create(dto);
    const savedCustomer = await this.repo.save(customer);

    // Send event to RabbitMQ
    await this.rabbitMQService.publishCustomerCreatedEvent(savedCustomer);

    return savedCustomer;
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOneBy({ _id: new ObjectId(id) });
  }

  async update(id: string, dto: CustomerDto) {
    const existingCustomer = await this.repo.findOneBy({ _id: new ObjectId(id) });
    if (!existingCustomer) throw new NotFoundException('Customer not found');

    await this.repo.update({ _id: new ObjectId(id) }, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const customer = await this.repo.findOneBy({ _id: new ObjectId(id) });
    if (!customer) throw new NotFoundException('Customer not found');

    return this.repo.delete({ _id: new ObjectId(id) });
  }
}
