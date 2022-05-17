import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Fee } from './fee.schema';
import { Students } from './student.schema';
import { Units } from './units.schema';

export type SemesterDocument = Semesters & Document;

@Schema()
export class Semesters {
  @Prop({ required: true })
  semesteer: string;

  @Prop({ unique: true, required: true })
  status: string;

  @Prop({ unique: true, required: true })
  started_At: string;

  @Prop([Units])
  units: [Units];

  @Prop([Fee])
  fee: [Fee];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Students' })
  student: Students;
}

export const SemestersSchema = SchemaFactory.createForClass(Semesters);
