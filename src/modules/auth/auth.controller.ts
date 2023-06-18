import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth()
  me(@Headers('Authorization') auth: string) {
    return this.authService.me(auth);
  }

  @Post('register')
  register(@Body() { username, password }: AuthDto) {
    return this.authService.register({
      username: username,
      password: password,
    });
  }

  @Post('login')
  login(@Body() { username, password }: AuthDto) {
    return this.authService.login({
      username: username,
      password: password,
    });
  }
}
