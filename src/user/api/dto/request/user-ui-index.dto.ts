import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { UserEntity } from '../../../domain/user.entity';

export class UserUiIndexDto extends PickType(UserEntity, [
  'userId',
  'entryIndex',
]) {}

export class UpdateUserUiIndexDto {
  @ApiProperty({
    description: 'List of usersIds and entryIndexes',
    type: [UserUiIndexDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UserUiIndexDto)
  @IsArray()
  @Expose()
  items: UserUiIndexDto[];
}
