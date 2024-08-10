import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class RegistrationDto extends PickType(UserEntity, [
  'email',
  'password',
  'name',
]) {}
