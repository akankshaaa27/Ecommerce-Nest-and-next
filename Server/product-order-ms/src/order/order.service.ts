import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: CreateOrderDto) {
    const order = await this.repo.preload({ id, ...dto });
    if (!order) throw new NotFoundException('Order not found');
    return this.repo.save(order);
  }

  async remove(id: number) {
    const order = await this.repo.findOneBy({ id });
    if (!order) throw new NotFoundException('Order not found');
    return this.repo.remove(order);
  }
}
