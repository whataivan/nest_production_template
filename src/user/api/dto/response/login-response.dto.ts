import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';

export class LoginResponseDto extends PickType(UserEntity, ['role'] as const) {
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User id',
  })
  userId: number;
}
