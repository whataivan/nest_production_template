import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class UpdateUserDto extends PickType(UserEntity, [
  'name',
  'role',
  'isActive',
  'login',
  'email',
  'pincode',
  'workingZoneIds',
]) {}
