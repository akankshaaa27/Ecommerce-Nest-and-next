// import { IsNotEmpty, IsNumber } from 'class-validator';

// export class ProductDto {
//   @IsNotEmpty()
//   name: string;

//   @IsNumber()
//   price: number;
// }
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a valid number' })
  price: number;
}
