import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class FindWorkersDto extends PartialType(
  PickType(UserEntity, ['name', 'login', 'isActive']),
) {}
