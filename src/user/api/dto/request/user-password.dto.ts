import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserPasswordDto extends PickType(CreateUserDto, ['password']) {}
