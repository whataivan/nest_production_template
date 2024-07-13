import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { appModes } from '../config/app-modes';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    new Logger(ErrorExceptionFilter.name).error(exception.stack);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let stack = undefined;
    if (process.env.APP_MODE === appModes.development) {
      stack = exception.stack;
    }
    const res = {
      message: `Internal Server Error, ${exception?.message}`,
    };
    response.status(500).json({ ...res, stack });
    console.error(exception);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 400 || status === 409) {
      const bodyResponse: any = exception.getResponse();
      return response.status(status).json(bodyResponse);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.message,
    });
  }
}
