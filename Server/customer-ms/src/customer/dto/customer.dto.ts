import { IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  mobile: string;
}
