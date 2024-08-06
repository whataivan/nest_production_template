// import {LocalStrategy} from "../core/strategies/local.strategy";
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './api/user.controller';
import { UserService } from './infrastructure/user.service';
import { AuthService } from './infrastructure/auth.service';
import { AuthSessionRepository } from './infrastructure/auth.repository';
import { AuthController } from './api/auth.controller';

const strategies = [JwtStrategy];

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, UserController],
  providers: [
    JwtStrategy,
    ...strategies,
    JwtService,
    UserRepository,
    AuthService,
    AuthSessionRepository,
    UserService,
    ConfigService,
  ],
  exports: [UserService, AuthService, UserRepository, JwtService],
})
export class UserModule {}
