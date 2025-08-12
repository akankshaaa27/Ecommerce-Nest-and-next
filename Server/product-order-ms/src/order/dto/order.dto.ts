import { IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  customerId: number;

  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

// import { IsNotEmpty, IsNumber } from 'class-validator';

// export class OrderDto {
//   @IsNumber()
//   customerId: number;

//   @IsNumber()
//   productId: number;

//   @IsNumber()
//   quantity: number;
// }
