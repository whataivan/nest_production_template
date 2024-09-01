import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { UserRepository } from '../infrastructure/user.repository';
import { IdDto } from '../../core/dto/id.dto';
import { CreateUserDto } from '../api/dto/request/create-user.dto';
import { UserEntity } from '../domain/user.entity';
import { handleError } from '../../core/errors/handle-error';
import { UpdateUserDto } from '../api/dto/request/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Role } from '../../core/enums/role.enum';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async onModuleInit() {
    await this.createSuperAdmin();
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const passwordHash = await this.authService.generatePasswordHash(
      dto.password,
    );

    const entity = UserEntity.create({ ...dto, passwordHash });
    try {
      return await this.userRepository.create(entity);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(idDto: IdDto) {
    try {
      const user = await this.userRepository.findOne(idDto);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async update(idDto: IdDto, updateDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(idDto);
      if (!user) throw new NotFoundException('User not found');
      user.update(updateDto);
      return await this.userRepository.update(idDto, user);
    } catch (error) {
      handleError(error);
    }
  }

  async findMany() {
    try {
      await this.userRepository.findMany();
    } catch (error) {
      handleError(error);
    }
  }

  async delete(idDto: IdDto) {
    try {
      const user = await this.userRepository.findOne(idDto);
      if (!user) throw new NotFoundException('User not found');
      await this.userRepository.delete(idDto);
    } catch (error) {
      handleError(error);
    }
  }

  async createSuperAdmin() {
    try {
      const email = this.configService.get('SUPER_ADMIN_EMAIL');
      const password = this.configService.get('SUPER_ADMIN_PASSWORD');

      const isSuperAdminExists = await this.userRepository.findByEmail(email);

      if (isSuperAdminExists) {
        return;
      }

      const user: CreateUserDto = {
        email,
        password,
        role: Role.superadmin,
        name: 'Super Admin',
      };

      return await this.create(user);
    } catch (error) {
      handleError(error);
    }
  }
}
