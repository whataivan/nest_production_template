import {
  Controller,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  Get,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiRoutes } from '../../core/config/api-routes.enum';
import { LoginDto } from './dto/request/login.dto';
import { UserService } from '../infrastructure/user.service';
import { AuthService } from '../infrastructure/auth.service';

@ApiTags(ApiRoutes.auth)
@Controller(ApiRoutes.auth)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
