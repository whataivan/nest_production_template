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

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiRoutes } from '../../core/config/api-routes.enum';
import { LoginDto } from './dto/request/login.dto';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginResponseDto } from './dto/response/login-response.dto';

@ApiTags(ApiRoutes.auth)
@Controller(ApiRoutes.auth)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
