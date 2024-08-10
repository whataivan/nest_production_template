import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class UserView extends PickType(UserEntity, [
  'id',
  'name',
  'email',
  'role',
  'createdAt',
  'updatedAt',
]) {}
