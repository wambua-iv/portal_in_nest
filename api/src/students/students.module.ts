import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentSchema } from 'src/models/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Students.name, schema: StudentSchema }]),
    Students,
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule, Students],
})
export class StudentModule {}
