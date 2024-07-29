import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../domain/user.entity';
import { UserMapper } from './helpers/user.mapper';
import { IdDto } from '../../core/dto/id.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findOne({ id }: IdDto): Promise<UserEntity> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    return UserMapper.toEntity(result);
  }

  async create(
    entity: UserEntity,
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList> = this.prisma,
  ): Promise<UserEntity> {
    const data = UserMapper.toModel(entity);
    const userModel = await prisma.user.create({
      data: {
        ...data,
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
      where: { id: entity.id },
      data: {
        ...data,
      },
    });
    return UserMapper.toEntity(userModel);
  }
}
