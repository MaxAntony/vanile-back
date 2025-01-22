import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { AuthSignInResponse } from './entities/auth.entity';

export type JWTPayload = { sub: number; email: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthSignInResponse> {
    const user = await this.userService.findOneWithPassword(email);

    console.log(user);
    if (!compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, mail: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
