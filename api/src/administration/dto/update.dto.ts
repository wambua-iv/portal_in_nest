import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  user_Id: string;

  @IsNotEmpty()
  email: string;
}
