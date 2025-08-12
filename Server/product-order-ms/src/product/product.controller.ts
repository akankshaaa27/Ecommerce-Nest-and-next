import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

// @Controller('product')
// export class ProductController {}

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Post()
    create(@Body() dto: ProductDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: ProductDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
