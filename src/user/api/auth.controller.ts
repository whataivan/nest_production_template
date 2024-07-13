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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Serializable } from '../../core/decorators/serializable.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteAllUsersAuthSessionsCommand } from '../application/commands/delete-all-users-auth-sessions.command';

import { LoginUserDto } from './dto/request/login-user.dto';
import { CreateAuthSessionCommand } from '../application/commands/create-auth-session.command';
import { LocalAuthGuard } from '../../core/guards/local-auth.guard';
import { SignInDto } from './dto/response/sign-in.dto';
import { User } from '../../core/decorators/user.decorator';
import { IUser } from '../../shared/users/user.interface';
import { JwtGuard } from '../../core/guards/jwt.guard';
import { DeleteAuthSessionCommand } from '../application/commands/delete-auth-session.command';
import { ApiForbiddenResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { DeviceMeta } from '../../core/decorators/device-info.decorator';
import { DeviceInfoDto } from './dto/request/device-info.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { errorsDescriptions } from '../../core/enums/errors-descriptions.enum';
import { ValidationPipe } from '../../core/validation/validation.pipe';
import { UserView } from './dto/response/user.view';
import { FindUserQuery } from '../application/queries/find-user.query';
import { ApiRoutes } from '../../core/config/api-routes.enum';

@UsePipes(ValidationPipe)
@ApiTags('auth')
@ApiBadRequestResponse({
  description: errorsDescriptions.badRequest,
})
@ApiInternalServerErrorResponse({
  description: errorsDescriptions.serverErr,
})
@Controller(ApiRoutes.auth)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Serializable(SignInDto)
  @ApiOperation({ summary: 'Sign In' })
  @ApiCreatedResponse({
    description: 'Successful',
    type: SignInDto,
  })
  async signIn(
    @Body() loginDto: LoginUserDto,
    @DeviceMeta() deviceInfoDto: DeviceInfoDto,
  ) {
    return this.commandBus.execute<
      CreateAuthSessionCommand,
      { accessToken: string }
    >(new CreateAuthSessionCommand(loginDto, deviceInfoDto));
  }

  @ApiOperation({ summary: 'Get user info' })
  @ApiOkResponse({
    description: 'Successful',
    type: UserView,
  })
  @ApiSecurity('accessToken')
  @Get('me')
  @UseGuards(ThrottlerGuard, JwtGuard)
  @Serializable(UserView)
  async getMeInfo(@User() user: IUser) {
    return this.queryBus.execute<FindUserQuery, UserView>(
      new FindUserQuery({ userId: user.userId }),
    );
  }

  @ApiOperation({ summary: 'Sign out' })
  @ApiNoContentResponse({
    description: 'Successful deletion of user auth session',
  })
  @ApiForbiddenResponse({
    description: 'Authorization error',
  })
  @ApiBadRequestResponse({
    description: errorsDescriptions.badRequest,
  })
  @ApiSecurity('accessToken')
  @Delete('logout')
  @UseGuards(ThrottlerGuard, JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@User() user: IUser) {
    return this.commandBus.execute<DeleteAuthSessionCommand, boolean>(
      new DeleteAuthSessionCommand(user),
    );
  }
  @ApiOperation({ summary: `Delete all user sessions` })
  @ApiNoContentResponse({
    description: 'Successful deletion of user auth session',
  })
  @ApiForbiddenResponse({
    description: 'Authorization error',
  })
  @ApiBadRequestResponse({
    description: errorsDescriptions.badRequest,
  })
  @ApiSecurity('accessToken')
  @Delete('sessions')
  @UseGuards(ThrottlerGuard, JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSessions(@User() user: IUser) {

  }
}
