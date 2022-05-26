import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '@/decorators/getUser';
import {
  SemesterRegDto,
  SemesterTitleDto,
  StudentEmailDto,
  StudentIdDto,
} from './dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('profile')
  @HttpCode(HttpStatus.FOUND)
  studentProfile(@User('email') email: StudentEmailDto) {
    return this.studentService.getProfile(email);
  }

  @Get('check_semesters')
  checkSemesters(dto: StudentIdDto) {
    return this.studentService.checkSemesters(dto);
  }

  @Get('check_active_semester')
  @HttpCode(HttpStatus.FOUND)
  checkActiveSemesters(@Body() dto: StudentIdDto) {
    return this.studentService.checkActiveSemesters(dto);
  }

  @Get('get_semester')
  @HttpCode(HttpStatus.FOUND)
  getSemesterByTitle(@Body() dto: SemesterTitleDto) {
    return this.studentService.getSemesterByTitle(dto);
  }

  @Post('register_semester')
  @HttpCode(HttpStatus.ACCEPTED)
  registerSemester(@Body() dto: SemesterRegDto) {
    return this.studentService.registerSemester(dto);
  }
}
