import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from 'src/decorators/setMetaData';
import { AuthService } from './auth.service';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { Request } from 'express';
import { User } from 'src/decorators/getUser';

@Controller('auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() dto: SignUpAuthDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signin')
  signin(@Body() dto: SignInAuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    console.log(user);
    return this.authService.logout(user['email']);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @User('email') email: string,
    @User('refreshToken')
    refreshToken: string,
  ) {
    console.log(email, refreshToken);
    return this.authService.refreshToken(email, refreshToken);
  }
}
