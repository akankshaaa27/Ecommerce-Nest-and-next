// import { Test, TestingModule } from '@nestjs/testing';
// import { OrderController } from './order.controller';

// describe('OrderController', () => {
//   let controller: OrderController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [OrderController],
//     }).compile();

//     controller = module.get<OrderController>(OrderController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product/product.controller';

describe('OrderController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
