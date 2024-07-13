import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Parameter decorator which provides user object from request
 * @see [Param decorators - NestJS](https://docs.nestjs.com/custom-decorators#param-decorators)
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
