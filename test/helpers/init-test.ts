import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { configApp } from '../../src/core/config/config-app';

export const getTestApp = async () => {
  try {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    configApp(app);
    await app.init();

    return app;
  } catch (error) {
    throw error;
  }
};
