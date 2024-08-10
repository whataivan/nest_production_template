import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  IJWTToken,
  ITokenPayload,
} from '../../core/interfaces/jwt-token.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../api/dto/request/login.dto';
import { UserRepository } from '../infrastructure/user.repository';

import { handleError } from '../../core/errors/handle-error';
import { AuthSessionEntity } from '../domain/auth-session.entity';

export type JwtTokensData = {
  accessToken: string;
  expireAt: Date;
  issuedAt: Date;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  generateToken(data: IJWTToken): JwtTokensData {
    const expiresIn = this.configService.get('JWT_ACCESS_EXPIRES') || '30d';

    const secret = this.configService.get('JWT_ACCESS_SECRET') || 'secret';

    const accessToken = this.jwtService.sign(data, { secret, expiresIn });

    const { iat, exp } = this.jwtService.decode<ITokenPayload>(accessToken);

    return {
      accessToken,
      issuedAt: new Date(iat * 1000),
      expireAt: new Date(exp * 1000),
    };
  }

  decodeToken(accessToken: string): JwtTokensData {
    const { iat, exp } = this.jwtService.decode<ITokenPayload>(accessToken);
    return {
      accessToken,
      issuedAt: new Date(iat * 1000),
      expireAt: new Date(exp * 1000),
    };
  }

  private getPasswordSalt() {
    const salt = this.configService.get('PASSWORD_SALT');
    if (!salt) {
      throw new InternalServerErrorException('Please, provide password salt');
    }
    return Number(salt);
  }

  async generatePasswordHash(password: string) {
    const passwordSalt = await this.getPasswordSalt();

    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    return hashedPassword;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ForbiddenException('Email not found');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new ForbiddenException('Invalid password');
    try {
      const { accessToken, issuedAt, expireAt } = this.generateToken({
        userId: user.id,
        role: user.role,
      });
      const session = AuthSessionEntity.create({
        token: accessToken,
        issuedAt,
        expireAt,
        userId: user.id,
        ip: '0',
      });

      return { userId: user.id, role: user.role, accessToken: session.token };
    } catch (e) {
      handleError(e);
    }
  }
}
