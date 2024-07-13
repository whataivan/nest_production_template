import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';
import { ISignInReq } from '../../../../shared/users/sign-in.req.interface';

export class LoginUserDto
  extends PickType(UserEntity, ['login'])
  implements ISignInReq
{
  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  password: string;
}
