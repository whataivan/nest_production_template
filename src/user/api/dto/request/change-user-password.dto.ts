import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ChangeUserPasswordDto extends PickType(CreateUserDto, [
  'password',
]) {}
