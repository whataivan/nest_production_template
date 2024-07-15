import {
  applyDecorators,
  Controller as BaseController,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { errorsDescriptions } from '../enums/errors-descriptions.enum';
import { NoOmitValidationPipe } from '../validation/no-omit-validation.pipe';
import { ValidationPipe } from '../validation/validation.pipe';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.guard';

/**
 * Interface of controller options
 */
interface IControllerOptions {
  /**
   * If it's false, fields which aren't marked with expose decorator will be omited
   * @default false
   */
  noOmit: boolean;
}

/**
 * Class decorator which encapsulates common controllers decorators
 * @see [Decorator composition - NestJS](https://docs.nestjs.com/custom-decorators#decorator-composition)
 * @param path Basic path of API controller
 */
export function Controller(
  path: string,
  { noOmit }: IControllerOptions = { noOmit: false },
) {
  const Validator = noOmit ? NoOmitValidationPipe : ValidationPipe;
  return applyDecorators(
    BaseController({
      path,
    }),
    UsePipes(Validator),
    UseGuards( JwtGuard, RolesGuard),
    ApiTags(path),
    ApiSecurity('accessToken'),
    ApiBadRequestResponse({
      description: errorsDescriptions.badRequest,
    }),
    ApiInternalServerErrorResponse({
      description: errorsDescriptions.serverErr,
    }),

  );
}
