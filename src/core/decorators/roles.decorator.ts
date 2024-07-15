import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {Role} from "../enums/role.enum";


export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    ApiOperation({ description: `Access Roles: ${roles.join(', ')}.` }),
  );
