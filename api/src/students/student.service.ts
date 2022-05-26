import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument, Students } from '@/models/student.schema';
import {
  FeeDto,
  SemesterRegDto,
  SemesterTitleDto,
  StudentEmailDto,
  StudentIdDto,
} from './dto';
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Students.name) private StudentModel: Model<StudentDocument>,
  ) {}

  async getProfile(dto: StudentEmailDto) {
    return await this.StudentModel.findOne({ email: dto })
      .then((studentData) => {
        return {
          names: {
            firstname: studentData.name.firstname,
            lastname: studentData.name.lastname,
          },
          email: studentData.email,
          id: studentData.user_Id,
        };
      })
      .catch((err) => console.log(err));
  }

  async checkSemesters(dto: StudentIdDto) {
    return await this.StudentModel.findOne({ user_Id: dto.user_Id })
      .then((semesterData) => ({
        name: semesterData.name,
        id: semesterData.user_Id,
        _id: semesterData._id,
        semesters: semesterData.semesters,
      }))
      .catch((err) => console.log(err));
  }

  async checkActiveSemesters(dto: StudentIdDto) {
    return await this.StudentModel.aggregate([
      {
        $match: {
          user_Id: dto.user_Id,
          'semesters.status': 'pending' || 'active',
        },
      },
      { $project: { user_Id: 1, semesters: 1, name: 1 } },
    ]).catch((err) => console.log(err));
  }

  async getSemesterByTitle(dto: SemesterTitleDto) {
    return await this.StudentModel.aggregate([
      {
        $match: {
          user_Id: dto.user_Id,
          'semesters.semester': dto.title,
        },
      },
      { $project: { user_Id: 1, semesters: 1, name: 1 } },
    ]).catch((err) => console.log(err));
  }

  async checkFeeStatus(dto: StudentIdDto) {
    return await this.StudentModel.findOne({
      user_Id: dto.user_Id,
      semesters: { fee: { $elemMatch: { status: 'pending' || 'active' } } },
    }).then((feeData) => ({
      name: feeData.name,
      id: feeData.user_Id,
      _id: feeData._id,
      semesters: feeData.semesters.filter(
        (feePayment) => feePayment.status == 'pending' || 'verified',
      ),
    }));
  }

  async registerSemester(dto: SemesterRegDto) {
    const semesterData = await this.StudentModel.findOne({
      user_Id: dto.user_Id,
    });

    const semester = semesterData.semesters.find(
      (semester) => semester.semester == dto.semester,
    );

    console.log(semester);
    return semester
      ? new ForbiddenException('Semester Already Registered')
      : await this.updateSemester(dto);
  }

  async payFees(dto: FeeDto) {
    return await this.StudentModel.findOneAndUpdate(
      {
        user_Id: dto.user_Id,
        semesters: { $elemMatch: { semester: dto.semester } },
      },
      {
        $set: {
          semesters: [
            ...(await this.StudentModel.findOne({ user_Id: dto.user_Id }).then(
              (semesters) =>
                semesters.semesters.filter(
                  (sem) => sem.semester == dto.semester,
                ),
            )),
            {
              fee: [
                {
                  semester: dto.semester,
                  amount: dto.amount,
                  paymentMode: dto.paymentMode,
                },
              ],
            },
          ],
        },
      },
    );
  }

  //async makePayments(dto: PaymentDto) {}

  async updateSemester(dto: SemesterRegDto) {
    await this.StudentModel.updateOne(
      { user_Id: dto.user_Id },
      {
        $push: {
          semesters: {
            semester: dto.semester,
            started_At: dto.date,
            units: dto.units,
            status: dto.status,
            fee: dto.fee,
          },
        },
      },
    );

    return await this.StudentModel.aggregate([
      { $match: { user_Id: dto.user_Id, 'semesters.semester': dto.semester } },
      { $project: { user_Id: 1, semesters: 1 } },
    ]);
  }
}
