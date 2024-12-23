import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DbTestHelper } from '../helpers/db.helper';
import { getTestApp } from '../helpers/init-test';
import { ConfigService } from '@nestjs/config';
import { ApiRoutes } from '../../src/core/config/api-routes.enum';
import { LoginDto } from '../../src/user/api/dto/request/login.dto';
import { UserEntity } from '../../src/user/domain/user.entity';
import { LoginResponseDto } from '../../src/user/api/dto/response/login-response.dto';
import { FakeDataHelper } from '../helpers/fake-data.helper';
import { Role } from '../../src/core/enums/role.enum';
import { DataHelper } from '../helpers/data.helper';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let fakeDataHelper: FakeDataHelper;

  let superAdminLogin: string;
  let superAdminPass: string;

  let superAdminToken: string;
  let adminToken: string;
  let userToken: string;
  let admin1: UserEntity;

  beforeAll(async () => {
    await new DbTestHelper().clearDb();
    app = await getTestApp();
    const dataHelper = new DataHelper(app);
    fakeDataHelper = new FakeDataHelper();
    const configService = app.get(ConfigService);
    superAdminLogin = configService.get('SUPER_ADMIN_EMAIL');
    superAdminPass = configService.get('SUPER_ADMIN_PASSWORD');

    const tokens = await dataHelper.getTokens();
    adminToken = tokens.adminToken;
    userToken = tokens.userToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it(`Super admin login [POST] (${HttpStatus.OK})`, async () => {
    const data: LoginDto = {
      email: superAdminLogin,
      password: superAdminPass,
    };
    const { body } = await request(app.getHttpServer())
      .post(`/${ApiRoutes.auth}/login`)
      .send(data)
      .expect(HttpStatus.OK);

    const response = body as LoginResponseDto;

    expect(response.accessToken).toBeDefined();
    expect(response.role).toBeDefined();
    expect(response.userId).toBeDefined();
    superAdminToken = response.accessToken;
  });

  it(`Create user (superAdmin auth) [POST] (${HttpStatus.CREATED})`, async () => {
    const data = fakeDataHelper.createFakeUser(Role.admin);

    const { body } = await request(app.getHttpServer())
      .post(`/${ApiRoutes.users}`)
      .send(data)
      .auth(superAdminToken, { type: 'bearer' })
      .expect(HttpStatus.CREATED);

    const user = body as UserEntity;

    expect(user.id).toBeDefined();
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    expect(user.role).toBe(data.role);
    expect(user.password).not.toBeDefined();
    expect(user.passwordHash).not.toBeDefined();

    admin1 = user;
  });

  it(`Attempt to create user (no auth) [POST] (${HttpStatus.UNAUTHORIZED})`, async () => {
    const data = fakeDataHelper.createFakeUser(Role.admin);
    await request(app.getHttpServer())
      .post(`/${ApiRoutes.users}`)
      .send(data)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it(`Attempt to create user (user auth) [POST] (${HttpStatus.FORBIDDEN})`, async () => {
    const data = fakeDataHelper.createFakeUser(Role.admin);
    await request(app.getHttpServer())
      .post(`/${ApiRoutes.users}`)
      .send(data)
      .auth(userToken, { type: 'bearer' })
      .expect(HttpStatus.FORBIDDEN);
  });

  it(`Update user (admin auth) [POST] (${HttpStatus.OK})`, async () => {
    const data = fakeDataHelper.createFakeUser(Role.admin);
    const { body } = await request(app.getHttpServer())
      .put(`/${ApiRoutes.users}/${admin1.id}`)
      .send(data)
      .auth(adminToken, { type: 'bearer' })
      .expect(HttpStatus.OK);

    const user = body as UserEntity;
    expect(user.id).toBeDefined();
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    expect(user.role).toBe(data.role);
  });
});
