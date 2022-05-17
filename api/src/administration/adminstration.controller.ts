import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { UpdateDto, UpdateSemDto, UserInfoDto } from './dto';

@Controller('admin')
export class AdministrationController {
  constructor(private admin: AdministrationService) {}

  @Get('all_users')
  getAllUsers() {
    return this.admin.getAllUsers();
  }
  @Patch('update_user')
  updateUser(@Body() dto: UpdateDto) {
    return this.admin.updateUserInfo(dto);
  }

  @Get('students')
  getAllStudents() {
    return this.admin.viewStudents();
  }

  @Get('student')
  getStudentById(@Body() dto: UserInfoDto) {
    return this.admin.getStudentById(dto);
  }

  @Patch('register_semester')
  registerSemester(@Body() dto: UpdateSemDto) {
    return this.admin.registerSemester(dto);
  }
}
