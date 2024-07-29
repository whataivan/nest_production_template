import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiRoutes } from '../../core/config/api-routes.enum';
import { Controller } from '../../core/decorators/controller.decorator';
import { Get } from '@nestjs/common';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../core/enums/role.enum';

@Controller(ApiRoutes.users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user' })
  @Roles(Role.superadmin, Role.admin)
  @ApiCreatedResponse({
    description: 'Successful',
  })
  @Get()
  async get() {
    const result = 'hi from api';
    return result;
  }
}
