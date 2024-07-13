import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthSession } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthSessionMapper } from './helpers/auth-session.mapper';
import { AuthSessionEntity } from '../domain/auth-session.entity';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createSession(
    sessionEntity: AuthSessionEntity,
  ): Promise<AuthSessionEntity> {
    const data = AuthSessionMapper.toModel(sessionEntity);
    const session = await this.prisma.authSession.create({
      data,
    });
    if (!session) return;
    return AuthSessionMapper.toEntity(session);
  }

  async findSession({
    deviceId,
  }: Pick<AuthSession, 'deviceId'>): Promise<AuthSessionEntity> {
    const session = await this.prisma.authSession.findUnique({
      where: { deviceId },
    });
    if (!session) return;
    return AuthSessionMapper.toEntity(session);
  }

  async deleteSession({
    deviceId,
  }: Pick<AuthSession, 'deviceId'>): Promise<boolean> {
    if (!deviceId) throw new ConflictException();
    const result = await this.prisma.authSession.deleteMany({
      where: { deviceId },
    });
    return !!result;
  }

  async deleteSessionsByUserId(userId: number) {
    if (!userId) throw new ConflictException();
    const result = await this.prisma.authSession.deleteMany({
      where: { userId },
    });
    return !!result;
  }
}
