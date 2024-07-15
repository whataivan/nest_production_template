import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AppInitService implements OnApplicationBootstrap {
  constructor(

  ) {}

  async onApplicationBootstrap() {
  //   const admin: CreateUserDto = {
  //     name: 'SuperAdmin',
  //     password: this.configService.get('ADMIN_PASS'),
  //     login: this.configService.get('ADMIN_LOGIN'),
  //     role: Role.superadmin,
  //   };
  //   const existingUser = await this.userRepository.findOne({
  //     login: admin.login,
  //   });
  //   if (existingUser) return;
  //   await this.commandBus.execute(new CreateUserCommand(admin));
  }

}
