import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument, Students } from 'src/models/student.schema';
import { StudentIdDto } from './dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Students.name) private StudentModel: Model<StudentDocument>,
  ) {}

  async getProfile(dto: StudentIdDto) {
    return await this.StudentModel.findOne({ user_Id: dto.user_Id })
      .then((studentData) => ({
        names: studentData.name,
        email: studentData.email,
        id: studentData.user_Id,
      }))
      .catch((err) => console.log(err));
  }

  async registerSemester() {}
}
