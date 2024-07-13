import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../shared/emuns/role.enum';
import { CreateUserDto } from '../../user/api/dto/request/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../user/application/commands/create-user.command';
import { UserRepository } from '../../user/infrastructure/user.repository';

@Injectable()
export class AppInitService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  async onApplicationBootstrap() {
    const admin: CreateUserDto = {
      name: 'SuperAdmin',
      password: this.configService.get('ADMIN_PASS'),
      login: this.configService.get('ADMIN_LOGIN'),
      role: Role.superadmin,
    };
    const existingUser = await this.userRepository.findOne({
      login: admin.login,
    });
    if (existingUser) return;
    await this.commandBus.execute(new CreateUserCommand(admin));
  }
}
