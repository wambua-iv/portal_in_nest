import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Semesters } from './semester.schema';

export type StudentDocument = Students & Document;

@Schema()
export class Students {
  @Prop({ type: Object, required: true })
  name: {
    firstname: string;
    lastname: string;
  };

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  user_Id: string;

  @Prop([Semesters])
  semesters: [Semesters];
}

export const StudentSchema = SchemaFactory.createForClass(Students);
