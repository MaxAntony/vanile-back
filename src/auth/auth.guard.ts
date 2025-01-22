import { DatabaseService } from '@/common/database/database.service';
import { jwtConstants } from '@/constants';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWTPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private db: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token, { secret: jwtConstants.secret });
      const user = await this.db.user.findUnique({ where: { id: payload.sub, email: payload.email } });
      if (!user) throw new UnauthorizedException();

      request['user'] = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
