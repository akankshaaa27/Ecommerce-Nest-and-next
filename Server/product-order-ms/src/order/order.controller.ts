import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly service: OrderService) { }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        console.log(this.service.findAll())
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CreateOrderDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
