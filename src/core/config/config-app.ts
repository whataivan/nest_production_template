import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../../app.module';
import * as cookieParser from 'cookie-parser';
import {
  ErrorExceptionFilter,
  HttpExceptionFilter,
} from '../exception/exception.filter';

export const configApp = (app: INestApplication) => {
  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());
};
