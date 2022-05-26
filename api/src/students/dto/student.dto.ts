import { IsNotEmpty, IsString } from 'class-validator';

export class StudentEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class StudentIdDto {
  @IsString()
  @IsNotEmpty()
  user_Id: string;
}
