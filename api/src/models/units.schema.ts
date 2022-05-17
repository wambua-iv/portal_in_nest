import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Units & Document;

@Schema()
export class Units {
  @Prop()
  name: string;

  @Prop({ type: Object })
  results: {
    grade: string;
    marks: string;
  };

  @Prop()
  status: string;
}

export const UnitsSchema = SchemaFactory.createForClass(Units);
