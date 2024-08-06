import { toBooleanPipe } from '../../core/pipes/to-boolean.pipe';

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../core/enums/role.enum';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from '../api/dto/request/create-user.dto';
import { UpdateUserDto } from '../api/dto/request/update-user.dto';

export class UserEntity implements IUser {
  @IsInt()
  @Min(1)
  @Max(100000000)
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  id: number;

  // @IsString()
  // @Expose()
  // @ApiProperty({
  //   description: 'User login',
  //   example: 'user1',
  // })
  // login: string;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'User name',
    example: 'David Smith',
  })
  name: string;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'email',
    example: 'email@mail.com',
  })
  email: string;

  @IsEnum(Role)
  @Expose()
  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.admin,
  })
  role: Role;

  @IsString()
  passwordHash: string;

  @Expose()
  @Exclude()
  @MinLength(6)
  @MaxLength(25)
  @ApiProperty({
    name: 'Password',
    description: 'Password',
    example: '1234565',
  })
  password?: string;

  @IsDate()
  @Expose()
  @IsOptional()
  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
    required: false,
  })
  createdAt?: Date;

  @IsDate()
  @Expose()
  @IsOptional()
  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
    required: false,
  })
  updatedAt?: Date;

  static create(
    dto: CreateUserDto & {
      passwordHash: string;
    },
  ) {
    const user = new UserEntity();
    user.passwordHash = dto.passwordHash;
    user.name = dto.name;
    user.role = dto.role;
    user.email = dto.email;

    return user;
  }

  update(dto: UpdateUserDto) {
    this.name = dto.name;
    this.role = dto.role;
    this.email = dto.email;
  }

  setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;
  }
}
