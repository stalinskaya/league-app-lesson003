import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/AuthDto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async me(authToken: string) {
    if (authToken) {
      const authorization = authToken.split(' ')[1];
      let decoded;
      try {
        decoded = this.jwtService.verify(authorization);
      } catch (e) {
        throw new UnauthorizedException('Not authorized');
      }
      const userId = decoded._id;
      const user = await this.usersService.findOne(userId);
      return user.username;
    } else {
      throw new UnauthorizedException('Not authorized');
    }
  }

  async register({ username, password }: AuthDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const user = await this.usersService.create({
      username: username,
      password: hash,
    });
    return user;
  }

  async login({ username, password }: AuthDto) {
    const users = await this.usersService.find({ username });
    if (!users) {
      throw new UnauthorizedException('Invalid username');
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { _id: user._id, username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
