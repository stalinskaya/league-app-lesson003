import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { JwtPayload } from './jwt-payload.type';
import { Requestor } from './requestor.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  me(@Headers() headers, @Requestor() requestor: JwtPayload) {
    return requestor;
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
