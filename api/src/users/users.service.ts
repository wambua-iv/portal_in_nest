import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UserDocument } from '../models/users.schema';
import { UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private UserModel: Model<UserDocument>,
  ) {}

  async findByEmail(dto: UserDto) {
    this.UserModel.findOne({ email: dto.email });
  }

  async findAll(): Promise<Users[]> {
    return this.UserModel.find().exec();
  }
}
