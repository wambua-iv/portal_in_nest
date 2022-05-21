import { IsEmail, IsNotEmpty, IsObject } from 'class-validator';

export class SignUpAuthDto {
  @IsObject()
  @IsNotEmpty()
  name: {
    firstname: string;
    lastname: string;
  };

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  user_Id: string;

  @IsNotEmpty()
  password: string;
}

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LogoutAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
