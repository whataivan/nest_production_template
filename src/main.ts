import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './core/documentation/swagger.config';
import { configApp } from './core/config/config-app';
import { appEnvironments } from './core/enums/environment.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('API_PORT') || '5000';
  const host = configService.get<string>('API_HOST') || 'localhost';
  const env = configService.get<string>('NODE_ENV');

  if (env === appEnvironments.development) {
    SwaggerConfig.setup(app);
    SwaggerConfig.writeSwaggerFile(host, port, env);
  }

  await app.listen(port);
  console.log(`App listening at: ${host}:${port}/ in environment: ${env}`);
}

bootstrap().catch((e) => {
  console.error('Bootstrap catch error:', e);
});
