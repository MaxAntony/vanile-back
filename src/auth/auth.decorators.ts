import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayload } from './auth.service';

export const GetUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext): number | null => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as JWTPayload | undefined;
  return user.sub ?? null;
});
