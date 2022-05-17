import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Semesters } from './semester.schema';

export type FeeDocument = Fee & Document;

@Schema()
export class Fee {
  @Prop()
  semester: string;

  @Prop()
  paymentMode: string;

  @Prop()
  amount: number;

  @Prop()
  balance: number;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Semesters' })
  student: Semesters;
}

export const FeeSchema = SchemaFactory.createForClass(Fee);
