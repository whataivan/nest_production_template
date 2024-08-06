import { IsInt, IsString, IsDate, Min, Max } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthSessionDto } from '../api/dto/request/create-auth-session.dto';
import { IAuthSession } from './interfaces/auth-session.interface';

export class AuthSessionEntity implements IAuthSession {
  @IsInt()
  @Min(1)
  @Max(100000000)
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    description: 'Auth Session ID',
    example: '1',
  })
  id: number;

  @IsInt()
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  userId: number;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'IP address',
    example: '192.168.1.1',
  })
  ip: string;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Jwt token',
  })
  token: string;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'Creation date and time',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  createdAt: Date;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'Issue date and time',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  issuedAt: Date;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'Expiration date and time',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  expireAt: Date;

  static create(dto: CreateAuthSessionDto) {
    const entity = new AuthSessionEntity();
    entity.token = dto.token;
    entity.issuedAt = dto.issuedAt;
    entity.expireAt = dto.expireAt;
    entity.ip = dto.ip;
    entity.userId = dto.userId;
    return entity;
  }
}
