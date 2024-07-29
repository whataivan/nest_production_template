import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig} from "./core/documentation/swagger.config";
import {configApp} from "./core/config/config-app";
import {appEnvironments} from "./core/enums/environment.enum";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('API_PORT') || '5000';
  const host = configService.get<string>('API_HOST') || 'localhost';
  const mode = configService.get<string>('NODE_ENV');

  if (mode === appEnvironments.development) {
    SwaggerConfig.setup(app);
  }

  await app.listen(port);
  console.log(`App listening at: ${host}:${port}/ in environment: ${mode}`);

  if (mode === appEnvironments.development) {
    SwaggerConfig.writeSwaggerFile(host, port, mode);
  }
}

bootstrap().catch((e) => {
  console.error(e);
});