import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user.entity';
import { IUser } from '../../../../shared/users/user.interface';

export class UserIdDto
  extends PickType(UserEntity, ['userId'])
  implements Pick<IUser, 'userId'> {}
