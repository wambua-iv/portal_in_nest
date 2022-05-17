import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Users, UserSchema } from '../models/users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    Users,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [MongooseModule, Users],
})
export class UserModule {}
