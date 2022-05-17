import { Controller, Get } from '@nestjs/common';
import { User } from 'src/decorators/getUser';
import { StudentIdDto } from './dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private student: StudentService) {}

  @Get('profile')
  studentProfile(@User('user_Id') user_Id: StudentIdDto) {
    return this.student.getProfile(user_Id);
  }
}
