import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  user_Id: string;

  @IsNotEmpty()
  email: string;
}
