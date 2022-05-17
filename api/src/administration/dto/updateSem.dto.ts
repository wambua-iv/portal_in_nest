import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSemDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  user_Id: string;
}
