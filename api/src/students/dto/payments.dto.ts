import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeeDto {
  @IsString()
  @IsNotEmpty()
  user_Id: string;

  @IsNotEmpty()
  @IsString()
  semester: string;

  @IsNumber()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  paymentMode: string;
}

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  user_Id: string;

  @IsString()
  @IsNotEmpty()
  nameOfPayment: string;

  @IsString()
  @IsNotEmpty()
  paymentMode: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
