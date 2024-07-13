
import { IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class CreateUserDto
  extends PickType(UserEntity, [
    'name',
    'role',
    'login',
    'email',
    'workingZoneIds',
    'isActive',
    'pincode',
  ])
{
  @IsString()
  @Expose()
  @MinLength(4)
  @ApiProperty({
    description: 'Password, min length 5',
    example: '123456',
  })
  password: string;
}
