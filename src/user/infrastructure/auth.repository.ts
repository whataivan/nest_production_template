import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Путь к вашему сервису Prisma
import { AuthSessionEntity } from '../domain/auth-session.entity';
import { AuthSessionMapper } from './helpers/auth-session.mapper';

@Injectable()
export class AuthSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: AuthSessionEntity): Promise<AuthSessionEntity> {
    const model = AuthSessionMapper.toModel(entity);
    const created = await this.prisma.authSession.create({
      data: model,
    });
    return AuthSessionMapper.toEntity(created);
  }

  async findById(id: number): Promise<AuthSessionEntity> {
    const model = await this.prisma.authSession.findUnique({
      where: { id },
    });
    return AuthSessionMapper.toEntity(model);
  }

  async update(entity: AuthSessionEntity): Promise<AuthSessionEntity> {
    const model = AuthSessionMapper.toModel(entity);
    const updated = await this.prisma.authSession.update({
      where: { id: model.id },
      data: model,
    });
    return AuthSessionMapper.toEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.authSession.delete({
      where: { id },
    });
  }
}
