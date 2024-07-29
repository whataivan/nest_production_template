import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';
import { IsInt } from 'class-validator';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'role',
]) {
  @IsInt()
  password: string;
}
