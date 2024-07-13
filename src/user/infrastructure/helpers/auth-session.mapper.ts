import { AuthSession } from '@prisma/client';
import { AuthSessionEntity } from '../../domain/auth-session.entity';

export class AuthSessionMapper {
  static toModel(
    entity: AuthSession,
  ): Omit<AuthSession, 'sessionId' | 'createdAt'> {
    if (!entity) return;
    return {
      userId: entity.userId,
      deviceId: entity.deviceId,
      expireAt: entity.expireAt,
      issuedAt: entity.issuedAt,
      ip: entity.ip,
      deviceName: entity.deviceName,
    };
  }
  static toEntity(sessionModel: AuthSession) {
    if (!sessionModel) return;
    const entity = new AuthSessionEntity();
    entity.userId = sessionModel.userId;
    entity.deviceId = sessionModel.deviceId;
    entity.ip = sessionModel.ip;
    entity.deviceName = sessionModel.deviceName;
    entity.createdAt = sessionModel.createdAt;
    return entity;
  }
}
