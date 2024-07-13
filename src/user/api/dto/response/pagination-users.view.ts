import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationView } from '../../../../core/dto/pagination.view';
import { UserView } from './user.view';

export class PaginationUsersView extends PaginationView {
  @Expose()
  @ApiProperty({
    description: 'Array of Reports',
    type: [UserView],
  })
  @Type(() => UserView)
  data: UserView[];
}
