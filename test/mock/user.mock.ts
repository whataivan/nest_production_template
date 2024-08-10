import { CreateUserDto } from '../../src/user/api/dto/request/create-user.dto';
import { Role } from '../../src/core/enums/role.enum';

export const mockUserAdmin1: CreateUserDto = {
  email: 'admin1@example.com',
  name: 'userAdmin1',
  role: Role.admin,
  password: 'userAdminPass1',
};
