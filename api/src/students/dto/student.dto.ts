import { IsNotEmpty, IsString } from 'class-validator';

export class StudentIdDto {
  @IsNotEmpty()
  user_Id: string;
}
