import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './core/documentation/swagger.config';
import { configApp } from './core/config/config-app';
import { appEnvironments } from './core/enums/environment.enum';

async function bootstrap() {
  try {
    console.log('Starting application bootstrap...');
    const app = await NestFactory.create(AppModule);
    console.log('Nest application created.');

    configApp(app);
    console.log('Application configuration completed.');

    const configService = app.get(ConfigService);
    const port = configService.get<string>('API_PORT') || '5000';
    const host = configService.get<string>('API_HOST') || 'localhost';
    const mode = configService.get<string>('NODE_ENV');

    console.log(`Environment mode: ${mode}`);
    if (mode === appEnvironments.development) {
      SwaggerConfig.setup(app);
      console.log('Swagger setup completed.');
    }

    console.log(`App listening at: ${host}:${port}/ in environment: ${mode}`);

    if (mode === appEnvironments.development) {
      SwaggerConfig.writeSwaggerFile(host, port, mode);
      console.log('Swagger file written.');
    }
    await app.listen(port);
  } catch (error) {
    console.error('Bootstrap error:', error);
  }
}

bootstrap().catch((e) => {
  console.error('Bootstrap catch error:', e);
});
