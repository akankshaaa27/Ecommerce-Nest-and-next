import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() dto: CustomerDto) {
    return this.customerService.create(dto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CustomerDto) {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
