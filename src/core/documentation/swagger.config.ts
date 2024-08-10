import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);
  }

  static writeSwaggerFile(host: string, port: string, mode: string): void {
    const swaggerData = {
      host,
      port,
      mode,
      swaggerPath: 'documentation',
    };

    const outputPath = join(__dirname, 'swagger-config.json');
    writeFileSync(outputPath, JSON.stringify(swaggerData, null, 2));
  }
}
