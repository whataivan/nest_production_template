import { toBooleanPipe } from '../../core/pipes/to-boolean.pipe';
import { WorkingZoneEntity } from '../../settings/domain/working-zone.entity';
import { Role } from '../../shared/emuns/role.enum';
import { IUser } from '../../shared/users/user.interface';
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
  Min,
} from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../api/dto/request/create-user.dto';
import { UpdateUserDto } from '../api/dto/request/update-user.dto';
import { AuthSessionEntity } from './auth-session.entity';

export class UserEntity implements IUser {
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

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'User login',
    example: 'user1',
  })
  login: string;

  @IsEnum(Role)
  @Expose()
  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.admin,
  })
  role: Role;

  @Transform(toBooleanPipe)
  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty({
    description: 'This user is active',
    required: false,
    default: true,
  })
  isActive?: boolean = true;

  @IsString()
  passwordHash: string;

  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Name of user',
    example: 'John Smith',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    description: 'email',
    example: 'email@mail.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 4)
  @Matches(/^\d+$/, {
    message: 'Pincode must contain only numeric characters.',
  })
  @Expose()
  @ApiProperty({
    description: 'pincode',
    example: '1234',
    type: String,
    required: false,
  })
  pincode?: string;

  @ApiProperty({
    description: 'Position of the entry in the user in the UI',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @Expose()
  entryIndex?: number;

  @ApiProperty({
    description: 'workingZone Ids',
    type: [Number],
    example: [1],
    required: false,
  })
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(2147483647, { each: true })
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  @Expose()
  workingZoneIds?: number[];

  @Expose()
  @ApiProperty({
    description: 'List of working zones',
    type: [WorkingZoneEntity],
  })
  @Type(() => WorkingZoneEntity)
  workingZones: WorkingZoneEntity[];

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'The date and time when the user was created',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  createdAt: Date;

  @IsDate()
  @Expose()
  @ApiProperty({
    description: 'The date and time when the user was updated',
    example: '2021-08-21T15:52:04.000Z',
    type: Date,
  })
  updatedAt: Date;

  session?: AuthSessionEntity;

  @Transform(toBooleanPipe)
  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty({
    description: 'Allowed to delete by activity logs',
    example: true,
    required: false,
  })
  allowedToDelete?: boolean;

  static create(
    dto: CreateUserDto & {
      passwordHash: string;
    },
  ) {
    const user = new UserEntity();
    user.login = dto.login;
    user.passwordHash = dto.passwordHash;
    user.name = dto.name;
    user.role = dto.role;
    user.isActive = dto.isActive;
    user.email = dto.email;
    user.pincode = dto.pincode;
    user.workingZoneIds = dto.workingZoneIds;

    return user;
  }

  update(dto: UpdateUserDto) {
    this.name = dto.name;
    this.role = dto.role;
    this.isActive = dto.isActive;
    this.login = dto.login;
    this.email = dto.email;
    this.pincode = dto.pincode;
    this.workingZoneIds = dto.workingZoneIds;
  }

  setPasswordHash(passwordHash: string) {
    this.passwordHash = passwordHash;
  }
}
