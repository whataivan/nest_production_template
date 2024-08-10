import {
  applyDecorators,
  Controller as BaseController,
  UsePipes,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { NoOmitValidationPipe } from '../validation/no-omit-validation.pipe';
import { ValidationPipe } from '../validation/validation.pipe';

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
    ApiTags(path),
    ApiSecurity('accessToken'),
  );
}
