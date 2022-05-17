import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Students, StudentDocument } from 'src/models/student.schema';
import { Users, UserDocument } from 'src/models/users.schema';
import { PaymentDto, UpdateDto, UpdateSemDto, UserInfoDto } from './dto';
import { AccountType, UserReturnType } from './Utils';

@Injectable()
export class AdministrationService {
  constructor(
    @InjectModel(Users.name) private UserModel: Model<UserDocument>,
    @InjectModel(Students.name) private StudentModel: Model<StudentDocument>,
  ) {}

  async updateUserInfo(dto: UpdateDto) {
    console.log(dto);
    const Registered = await this.UserModel.findOneAndUpdate(
      { email: dto.email },
      {
        $set: {
          accountType: dto.accountType,
          user_Id: dto.user_Id,
        },
      },
    ).then(async (user) => {
      console.log(user);
      if (user.accountType == AccountType.student) {
        const student = new this.StudentModel({
          name: user.name,
          email: user.email,
          user_Id: user.user_Id,
        });

        const registered = await student
          .save()
          .then((student) => ({
            name: student.name,
            user_Id: student.user_Id,
            email: student.email,
          }))
          .catch((err) =>
            err.code === 11000
              ? new ForbiddenException('Credentials already exists')
              : //new InternalServerErrorException('server error'),
                console.log(err),
          );
        return registered;
      }

      if (user.accountType === AccountType.lecturer) return 2;
      if (user.accountType === AccountType.admin) return 3;
    });
    return Registered;
  }

  async getAllUsers(): Promise<UserReturnType[]> {
    const Users = await this.UserModel.find().then((user) =>
      user.map((fields) => ({
        name: fields.name,
        user_Id: fields.user_Id,
        email: fields.email,
        role: fields.accountType,
      })),
    );

    return Users;
  }

  async viewStudents(): Promise<Students[]> {
    return this.StudentModel.find().exec();
  }

  async getStudentById(dto: UserInfoDto): Promise<Students> {
    return this.StudentModel.findOne({ user_Id: dto.user_Id }).exec();
  }

  async registerSemester(dto: UpdateSemDto) {
    await this.StudentModel.findOne({ user_Id: dto.user_Id }).then(
      (studentData) => console.log(studentData),
    );
  }

  //async viewPayments(dto: PaymentDto) {}
}
