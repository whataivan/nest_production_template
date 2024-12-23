import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'role',
  'password',
]) {}
