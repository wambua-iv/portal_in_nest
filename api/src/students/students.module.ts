import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentSchema } from '@/models/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Semesters, SemestersSchema } from '@/models/semester.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Students.name, schema: StudentSchema },
      { name: Semesters.name, schema: SemestersSchema },
    ]),
    Students,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [MongooseModule, Students],
})
export class StudentModule {}
