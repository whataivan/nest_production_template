import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class LoginDto extends PickType(UserEntity, ['email', 'password']) {}
