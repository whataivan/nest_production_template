import { ConfigService } from '@nestjs/config';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { LoginDto } from '../../src/user/api/dto/request/login.dto';
import * as request from 'supertest';
import { ApiRoutes } from '../../src/core/config/api-routes.enum';
import { LoginResponseDto } from '../../src/user/api/dto/response/login-response.dto';
import { FakeDataHelper } from './fake-data.helper';
import { Role } from '../../src/core/enums/role.enum';
import { CreateUserDto } from '../../src/user/api/dto/request/create-user.dto';
import { UserEntity } from '../../src/user/domain/user.entity';

export class DataHelper {
  public fakeDataHelper: FakeDataHelper;
  public superAdminLogin: string;
  public superAdminPass: string;
  public superAdminToken: string;
  public admin1: UserEntity;
  public admin2: UserEntity;
  public user1: UserEntity;
  public user2: UserEntity;

  constructor(public readonly app: INestApplication) {
    const configService = this.app.get(ConfigService);
    this.superAdminLogin = configService.get('SUPER_ADMIN_EMAIL');
    this.superAdminPass = configService.get('SUPER_ADMIN_PASSWORD');
    this.app = app;
    this.fakeDataHelper = new FakeDataHelper();
  }

  async loginUser(data: LoginDto) {
    const { body } = await request(this.app.getHttpServer())
      .post(`/${ApiRoutes.auth}/login`)
      .send(data)
      .expect(HttpStatus.OK);
    const response = body as LoginResponseDto;
    expect(response.accessToken).toBeDefined();
    expect(response.role).toBeDefined();
    expect(response.userId).toBeDefined();
    return response;
  }

  async loginSuperAdmin() {
    const data: LoginDto = {
      email: this.superAdminLogin,
      password: this.superAdminPass,
    };
    const response = await this.loginUser(data);
    this.superAdminToken = response.accessToken;
    return this.superAdminToken;
  }

  async createUser(user: CreateUserDto) {
    const { body } = await request(this.app.getHttpServer())
      .post(`/${ApiRoutes.users}`)
      .send(user)
      .auth(this.superAdminToken, { type: 'bearer' })
      .expect(HttpStatus.CREATED);
    const response = body as UserEntity;
    expect(response.id).toBeDefined();
    return response;
  }

  async createUsers() {
    if (!this.superAdminToken) {
      await this.loginSuperAdmin();
    }

    const adminUser1 = this.fakeDataHelper.createFakeUser(Role.admin);
    const adminUser2 = this.fakeDataHelper.createFakeUser(Role.admin);
    const userUser1 = this.fakeDataHelper.createFakeUser(Role.user);
    const userUser2 = this.fakeDataHelper.createFakeUser(Role.user);

    this.admin1 = await this.createUser(adminUser1);
    this.admin2 = await this.createUser(adminUser2);
    this.user1 = await this.createUser(userUser1);
    this.user2 = await this.createUser(userUser2);

    return {
      adminUser1: this.admin1,
      adminUser2: this.admin2,
      userUser1: this.user1,
      userUser2: this.user2,
    };
  }

  async getTokens() {
    if (!this.superAdminToken) {
      await this.loginSuperAdmin();
    }

    const adminData = this.fakeDataHelper.createFakeUser(Role.admin);
    const userData = this.fakeDataHelper.createFakeUser(Role.user);

    await this.createUser(adminData);
    await this.createUser(userData);

    const adminLoginResponse = await this.loginUser(adminData);
    const userLoginResponse = await this.loginUser(userData);

    return {
      userToken: userLoginResponse.accessToken,
      adminToken: adminLoginResponse.accessToken,
    };
  }
}
