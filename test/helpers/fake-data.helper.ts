import { Role } from '../../src/core/enums/role.enum';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../src/user/api/dto/request/create-user.dto';

export class FakeDataHelper {
  createFakeUser(role: Role) {
    const user: CreateUserDto = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      role,
      password: faker.internet.password(),
    };
    return user;
  }
}
