import { IsDate, IsInt, IsString, IsUUID, Max, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IAuthSession } from '../../shared/users/auth-session.interface';
import { UserEntity } from './user.entity';

export class AuthSessionEntity implements IAuthSession {
  @IsInt()
  @Min(1)
  @Max(2147483647)
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    description: 'AuthSession ID',
    example: '1',
  })
  sessionId: number;

  @IsInt()
  @Min(1)
  @Max(2147483647)
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  userId: number;

  @IsUUID()
  @Expose()
  @ApiProperty({
    description: 'Device Id',
  })
  deviceId: string;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Device info from request.headers["user-agent"]',
  })
  deviceName: string;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'User device IP address',
  })
  ip: string;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'User creation date and time',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  createdAt: Date;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'Date and time of token issuance',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  issuedAt: Date;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'Token expiration date and time',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  expireAt: Date;

  user?: UserEntity;

  static create(dto: Omit<IAuthSession, 'sessionId' | 'createdAt'>) {
    const entity = new AuthSessionEntity();
    entity.deviceId = dto.deviceId;
    entity.deviceName = dto.deviceName;
    entity.ip = dto.ip;
    entity.userId = dto.userId;
    entity.expireAt = dto.expireAt;
    entity.issuedAt = dto.issuedAt;
    return entity;
  }
}
