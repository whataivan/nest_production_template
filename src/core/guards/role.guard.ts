import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role} from "../enums/role.enum";
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      requiredRoles = [Role.admin];
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      console.error('User not found');
      return false;
    }
    return requiredRoles.some((role) => user.role === role);
  }
}
