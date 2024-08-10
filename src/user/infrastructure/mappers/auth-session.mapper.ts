import { AuthSessionEntity } from '../../domain/auth-session.entity';
import { AuthSession } from '@prisma/client';

export class AuthSessionMapper {
  static toModel(entity: AuthSessionEntity): AuthSession {
    if (!entity) return;
    return {
      id: entity.id,
      userId: entity.userId,
      ip: entity.ip,
      createdAt: entity.createdAt,
      issuedAt: entity.issuedAt,
      expireAt: entity.expireAt,
      token: entity.token,
    };
  }

  static toEntity(model: AuthSession): AuthSessionEntity {
    if (!model) return;
    const entity = new AuthSessionEntity();
    entity.id = model.id;
    entity.userId = model.userId;
    entity.ip = model.ip;
    entity.createdAt = model.createdAt;
    entity.issuedAt = model.issuedAt;
    entity.expireAt = model.expireAt;
    entity.token = model.token;
    return entity;
  }
}
