import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../domain/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { IdDto } from '../../core/dto/id.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findOne({ id }: IdDto): Promise<UserEntity> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    return UserMapper.toEntity(result);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const result = await this.prisma.user.findUnique({
      where: { email },
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
    { id }: IdDto,
    entity: UserEntity,
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList> = this.prisma,
  ): Promise<UserEntity> {
    const data = UserMapper.toModel(entity);
    const userModel = await prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return UserMapper.toEntity(userModel);
  }

  async findMany(): Promise<UserEntity[]> {
    const results = await this.prisma.user.findMany({});

    return results.map((u) => UserMapper.toEntity(u));
  }

  async delete({ id }: IdDto): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
