import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  create(dto: CreateCartDto) {
    const cart = this.cartRepository.create(dto);
    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOneBy({ id });
  }

  update(id: number, dto: UpdateCartDto) {
    return this.cartRepository.update(id, dto);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
