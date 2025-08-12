import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Post()
  create(@Body() dto: CreateCartDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCartDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(Number(id));
  }
}
