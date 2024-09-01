import {
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiRoutes } from '../../core/config/api-routes.enum';
import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../core/enums/role.enum';
import { UserService } from '../services/user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { IdDto } from '../../core/dto/id.dto';
import { Controller } from '../../core/decorators/controller.decorator';
import { UserView } from './dto/response/user.view';
import { Serialize } from '../../core/decorators/serializable.decorator';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { RolesGuard } from '../../core/guards/role.guard';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Controller(ApiRoutes.users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //------------------CREATE----------------------------
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'Successful',
    type: UserView,
  })
  @Serialize(UserView)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.admin, Role.superadmin)
  @ApiCreatedResponse({
    description: 'Successful',
  })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  //------------------FIND ONE----------------------------
  @ApiOperation({ summary: 'Get user' })
  @Roles(Role.superadmin, Role.admin)
  @ApiOkResponse({
    description: 'Successful',
    type: UserView,
  })
  @Serialize(UserView)
  @Get(':id')
  async finOne(@Param() idDto: IdDto) {
    return await this.userService.findOne(idDto);
  }

  //------------------UPDATE---------------------------
  @ApiOperation({ summary: 'Update user' })
  @Roles(Role.admin)
  @ApiOkResponse({
    description: 'Successful',
    type: UserView,
  })
  @Serialize(UserView)
  @Put(':id')
  async update(@Param() idDto: IdDto, @Body() dto: UpdateUserDto) {
    return await this.userService.update(idDto, dto);
  }

  //------------------FIND MANY----------------------------
  @ApiOperation({ summary: 'Get user' })
  @Roles(Role.superadmin, Role.admin)
  @ApiCreatedResponse({
    description: 'Successful',
  })
  @Get()
  async findMany() {
    return await this.userService.findMany();
  }

  //------------------DELETE---------------------------
  @ApiOperation({ summary: 'Delete user' })
  @Roles(Role.admin)
  @ApiOkResponse({
    description: 'Successful',
  })
  @Delete(':id')
  async delete(@Param() idDto: IdDto) {
    return await this.userService.delete(idDto);
  }
}
