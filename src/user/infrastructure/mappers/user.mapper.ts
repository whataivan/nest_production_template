import { UserEntity } from '../../domain/user.entity';
import { User } from '@prisma/client';
import { Role } from '../../../core/enums/role.enum';

export class UserMapper {
  static toModel(entity: UserEntity): User {
    if (!entity) return;
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      role: entity.role,
      passwordHash: entity.passwordHash,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(model: User) {
    if (!model) return;
    const entity = new UserEntity();
    entity.id = model.id;
    entity.email = model.email;
    entity.name = model.name;
    entity.role = model.role as Role;
    entity.passwordHash = model.passwordHash;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    return entity;
  }
}
