import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '@/decorators/setMetaData';
import { AuthService } from './auth.service';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { User } from '@/decorators/getUser';

@Controller('auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignUpAuthDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SignInAuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@User('email') email: string) {
    return this.authService.logout(email);
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
