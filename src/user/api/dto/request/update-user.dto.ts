import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';
import { IsInt } from 'class-validator';

export class UpdateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'role',
]) {}
