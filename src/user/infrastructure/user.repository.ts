import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../domain/user.entity';
import { UserMapper, UserMapperOptions } from './helpers/user.mapper';

import { UserUiIndexDto } from '../api/dto/request/user-ui-index.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async checkIdExist(userId: number): Promise<boolean> {
    const result = await this.prisma.user.findUnique({
      where: { userId },
      select: { userId: true },
    });
    return !!result;
  }



  public async checkIdsExist(ids: number[]): Promise<boolean> {
    if (!ids?.length) return false;

    const result = await this.prisma.user.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      select: { userId: true },
    });
    return result?.length === ids.length;
  }

  async create(
    entity: UserEntity,
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList> = this.prisma,
  ): Promise<UserEntity> {
    const data = UserMapper.toModel(entity);
    const userModel = await prisma.user.create({
      data: {
        ...data,
        userWorkingZones: {
          create: (entity.workingZoneIds || []).map((workingZoneId) => ({
            workingZone: {
              connect: { workingZoneId },
            },
          })),
        },
      },
      include: {
        userWorkingZones: {
          include: {
            workingZone: {
              include: {
                shiftTypeWorkingZone: { include: { shiftType: true } },
              },
            },
          },
        },
      },
    });

    return UserMapper.toEntity(userModel);
  }

  async update(
    entity: UserEntity,
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList> = this.prisma,
  ): Promise<UserEntity> {
    const data = UserMapper.toModel(entity);
    const userModel = await prisma.user.update({
      where: { userId: entity.userId },
      data: {
        ...data,
        userWorkingZones: {
          deleteMany: {},
          create: (entity.workingZoneIds || []).map((workingZoneId) => ({
            workingZone: {
              connect: { workingZoneId },
            },
          })),
        },
      },
      include: {
        userWorkingZones: {
          include: {
            workingZone: {
              include: {
                shiftTypeWorkingZone: { include: { shiftType: true } },
              },
            },
          },
        },
      },
    });
    return UserMapper.toEntity(userModel);
  }






}
