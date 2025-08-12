// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ProductService {}


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  create(dto: ProductDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: ProductDto) {
    const product = await this.repo.preload({ id, ...dto });
    if (!product) throw new NotFoundException('Product not found');
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return this.repo.remove(product);
  }
}
