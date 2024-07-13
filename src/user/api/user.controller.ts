import {
  Body,
  ConflictException,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiRoutes } from '../../core/config/api-routes.enum';
import { Controller } from '../../core/decorators/controller.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { Serializable } from '../../core/decorators/serializable.decorator';
import { User } from '../../core/decorators/user.decorator';
import { PaginationParamsDto } from '../../core/dto/pagination-params.dto';

import { CreateUserDto } from './dto/request/create-user.dto';
import { FindUsersDto } from './dto/request/find-users.dto';
import { FindWorkersDto } from './dto/request/find-workers.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserIdDto } from './dto/request/user-id.dto';
import { UserPasswordDto } from './dto/request/user-password.dto';
import { PaginationUsersView } from './dto/response/pagination-users.view';
import { UserView } from './dto/response/user.view';


@Controller(ApiRoutes.users)
export class UserController {
  constructor(

  ) {}

  @ApiOperation({ summary: 'Create User' })
  @Roles(Role.superadmin, Role.admin)
  @ApiCreatedResponse({
    description: 'Successful',
    type: UserView,
  })
  @Post()
  @Serializable(UserView)
  async create(@Body() dto: CreateUserDto, @User() authUser: IUser) {
    const result = await this.commandBus.execute<CreateUserCommand, UserView>(
      new CreateUserCommand(dto, authUser),
    );
    if (!result) {
      throw new InternalServerErrorException(
        'Can not create user server error',
      );
    }
    return result;
  }

  @ApiOperation({ summary: 'Update User' })
  @Roles(Role.superadmin, Role.admin)
  @ApiOkResponse({
    description: 'Successful',
    type: UserView,
  })
  @Put(':userId')
  @Serializable(UserView)
  async update(
    @Param() { userId }: UserIdDto,
    @Body() dto: UpdateUserDto,
    @User() authUser: IUser,
  ) {
    return this.commandBus.execute<UpdateUserCommand, UserView>(
      new UpdateUserCommand(userId, dto, authUser),
    );
  }

  @ApiOperation({
    summary: 'Reset user password to default',
  })
  @ApiOkResponse({
    description: 'Successful password change',
    type: UserView,
  })
  @Patch('resetPassword/:userId')
  @Roles(Role.superadmin, Role.admin)
  async resetPassword(
    @Param() { userId }: UserIdDto,
    @Body() dto: UserPasswordDto,
    @User() authUser: IUser,
  ) {
    return this.commandBus.execute<UpdateUserPasswordCommand, boolean>(
      new UpdateUserPasswordCommand(userId, dto, authUser),
    );
  }

  @ApiOperation({
    summary: 'Set a new password',
  })
  @ApiOkResponse({
    description: 'Successful password change',
    type: UserView,
  })
  @Patch('newPassword')
  @Roles(Role.admin)
  async newPassword(@User() user: IUser, @Body() dto: UserPasswordDto) {
    return this.commandBus.execute<UpdateUserPasswordCommand, boolean>(
      new UpdateUserPasswordCommand(user.userId, dto, user),
    );
  }

  @ApiOperation({ summary: 'Find all users' })
  @ApiOkResponse({
    description: 'Successful',
    type: PaginationUsersView,
  })
  @Get()
  @Roles(Role.admin, Role.superadmin, Role.worker, Role.guest)
  @Serializable(PaginationUsersView)
  findAll(
    @Query() findParams: FindUsersDto,
    @Query() paginationParams: PaginationParamsDto,
  ) {
    return this.queryBus.execute(
      new FindManyUsersQuery(paginationParams, findParams),
    );
  }

  @ApiOperation({ summary: 'Get list of workers' })
  @ApiOkResponse({
    description: 'Successful',
    type: PaginationUsersView,
  })
  @Get('/workers')
  @Roles(Role.admin, Role.superadmin, Role.worker, Role.guest)
  @Serializable(PaginationUsersView)
  workersList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() findParams: FindWorkersDto,
  ) {
    return this.queryBus.execute(
      new FindManyUsersQuery(paginationParams, {
        ...findParams,
        roles: [Role.worker],
      }),
    );
  }

  @ApiOperation({ summary: 'Find User by ID' })
  @ApiOkResponse({
    description: 'Successful',
    type: UserView,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':userId')
  @Roles(Role.admin, Role.superadmin)
  @Serializable(UserView)
  async findOne(@Param() dto: UserIdDto) {
    return this.queryBus.execute<FindUserQuery, UserView>(
      new FindUserQuery(dto),
    );
  }

  @ApiOperation({
    summary: 'Update the position of user in the interface',
  })
  @ApiNoContentResponse({
    description: 'Successful',
  })
  @Roles(Role.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/entryIndexes')
  async updateEntryIndexes(@Body() indexDto: UpdateUserUiIndexDto) {
    await this.commandBus.execute<UpdateUsersUiIndexCommand>(
      new UpdateUsersUiIndexCommand(indexDto),
    );
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiNoContentResponse({
    description: 'Successful',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':userId')
  @Roles(Role.superadmin, Role.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@User() authUser: IUser, @Param() { userId }: UserIdDto) {
    const result = await this.commandBus.execute<DeleteUserCommand>(
      new DeleteUserCommand(userId, authUser),
    );
    if (!result) throw new ConflictException('Some error...');
  }

  @ApiOperation({
    summary: 'Delete User if user has not activity logs for last time',
  })
  @ApiNoContentResponse({
    description: 'Successful',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete('check_activity/:userId')
  @Roles(Role.superadmin, Role.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteWithCheckActivityLogs(
    @User() authUser: IUser,
    @Param() { userId }: UserIdDto,
  ) {
    await this.commandBus.execute<DeleteUserWithActivityCheckCommand>(
      new DeleteUserWithActivityCheckCommand(userId, authUser),
    );
  }
}
