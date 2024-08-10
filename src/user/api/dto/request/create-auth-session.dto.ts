import { PickType } from '@nestjs/swagger';

import { AuthSessionEntity } from '../../../domain/auth-session.entity';

export class CreateAuthSessionDto extends PickType(AuthSessionEntity, [
  'userId',
  'token',
  'expireAt',
  'issuedAt',
  'ip',
]) {}
