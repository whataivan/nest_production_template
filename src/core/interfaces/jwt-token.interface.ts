import { Role } from '../enums/role.enum';

export interface IJWTToken {
  userId: number;
  role: Role;
}

export type ITokenPayload = {
  role: Role;
  userId: number;
  iat: number;
  exp: number;
};
