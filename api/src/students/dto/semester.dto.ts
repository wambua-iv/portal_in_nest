import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SemesterRegDto {
  @IsNotEmpty()
  @IsString()
  user_Id: string;

  @IsNotEmpty()
  @IsString()
  semester: string;

  @IsNotEmpty()
  date: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsArray()
  units: any[];

  @IsArray()
  fee: any[];
}

export class SemesterTitleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  user_Id: string;
}
