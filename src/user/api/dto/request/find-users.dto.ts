import { PartialType, PickType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { toArrayPipe } from '../../../../core/pipes/to-array.pipe';
import { UserEntity } from '../../../domain/user.entity';

export class FindUsersDto extends PartialType(
  PickType(UserEntity, ['name', 'login', 'isActive', 'pincode']),
) {
  @IsOptional()
  @Transform(toArrayPipe)
  @IsArray()
  @IsEnum(Role, { each: true })
  @Expose()
  roles?: Role[];
}
