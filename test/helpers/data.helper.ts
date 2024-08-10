import { ConfigService } from '@nestjs/config';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { LoginDto } from '../../src/user/api/dto/request/login.dto';
import * as request from 'supertest';
import { ApiRoutes } from '../../src/core/config/api-routes.enum';
import { LoginResponseDto } from '../../src/user/api/dto/response/login-response.dto';

export class DataHelper {
  public superAdminLogin: string;
  public superAdminPass: string;
  public superAdminToken: string;
  public admin1: string;
  public admin2: string;
  public user1: string;

  constructor(public readonly app: INestApplication) {
    const configService = this.app.get(ConfigService);
    this.superAdminLogin = configService.get('SUPER_ADMIN_EMAIL');
    this.superAdminPass = configService.get('SUPER_ADMIN_PASSWORD');
    this.app = app;
  }

  async loginSuperAdmin() {
    const data: LoginDto = {
      email: this.superAdminLogin,
      password: this.superAdminPass,
    };
    const { body } = await request(this.app.getHttpServer())
      .post(`/${ApiRoutes.auth}/login`)
      .send(data)
      .expect(HttpStatus.OK);

    const response = body as LoginResponseDto;

    expect(response.accessToken).toBeDefined();
    expect(response.role).toBeDefined();
    expect(response.userId).toBeDefined();
    this.superAdminToken = response.accessToken;
    return this.superAdminToken;
  }
}
