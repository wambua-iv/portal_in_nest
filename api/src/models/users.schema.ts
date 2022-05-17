import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ type: Object, required: true })
  name: {
    firstname: string;
    lastname: string;
  };

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  accountType: string;

  @Prop()
  user_Id: string;

  @Prop()
  hash: string;

  @Prop()
  TokenHash: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
