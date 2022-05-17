import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategy';
import { UserModule } from 'src/users/users.module';
import { Users } from 'src/models/users.schema';

@Module({
  imports: [JwtModule.register({}), UserModule, Users],
  controllers: [AuthContoller],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
