import { Role, User, UserWorkingZone } from '@prisma/client';
import { WorkingZoneMapper } from '../../../settings/infrastructure/helpers/working-zone.mapper';
import { WorkingZoneFullType } from '../../../settings/infrastructure/types/working-zone-full.type';
import { Role as RoleEnum } from '../../../shared/emuns/role.enum';
import { UserEntity } from '../../domain/user.entity';

export type UserMapperOptions = {
  hashInclude: boolean;
};

export type UserFullType = User & {
  userWorkingZones?: UserWorkingZoneFullType[];
};

export type UserWorkingZoneFullType = UserWorkingZone & {
  user?: User;
  workingZone?: WorkingZoneFullType;
};

export class UserMapper {
  static toModel(userEntity: UserEntity): User {
    if (!userEntity) return;
    return {
      userId: userEntity.userId,
      entryIndex: undefined,
      passwordHash: userEntity.passwordHash,
      login: userEntity.login,
      name: userEntity.name,
      isActive: userEntity.isActive,
      email: userEntity.email,
      pincode: userEntity.pincode,
      role: userEntity.role as Role,
      updatedAt: userEntity.updatedAt,
      createdAt: userEntity.createdAt,
    };
  }

  static toEntity(
    model: UserFullType,
    options?: UserMapperOptions,
  ): UserEntity {
    if (!model) return;
    const entity = new UserEntity();
    entity.userId = model.userId;
    entity.login = model.login;
    entity.isActive = model.isActive;
    entity.name = model.name;
    entity.email = model.email;
    entity.pincode = model.pincode;
    entity.role = model.role as RoleEnum;
    entity.entryIndex = model.entryIndex;
    entity.workingZoneIds = [];

    if (options?.hashInclude) {
      entity.passwordHash = model.passwordHash;
    }

    if (model.userWorkingZones?.length) {
      entity.workingZones = model.userWorkingZones.map((item) => {
        entity.workingZoneIds.push(item.workingZoneId);
        return WorkingZoneMapper.toEntity(item.workingZone);
      });
    }

    return entity;
  }
}
