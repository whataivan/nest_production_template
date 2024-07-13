import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { handleError } from '../errors/handle-error';

/**
 * Validates input data by class validator decorators
 * @see [Validation pipes - NestJS](https://docs.nestjs.com/pipes#class-validator)
 */
@Injectable()
export class NoOmitValidationPipe implements PipeTransform {
  /**
   * Checks if a metatype is not base JS type
   * @param metatype Metatype which is need to be checked
   */
  private toValidate(metatype: unknown): boolean {
    if (typeof metatype === 'function') {
      const types = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype as any);
    }
  }

  /**
   * Implements validation logic
   * @param value Value which need to validate
   * @param metadata Metadata of validating value
   * * {@link core/errors/exceptions/bad-request.exception!BadRequestException}
   * if input data is not valid
   */
  public async transform(value: unknown, { metatype }: ArgumentMetadata) {
    try {
      if (!value || typeof value !== 'object') {
        throw new BadRequestException('body is not an object');
      }
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
      const object = plainToClass(metatype, value);
      const errors = await validate(object, {
        whitelist: false,
        forbidNonWhitelisted: false,
      });
      if (errors.length > 0) {
        const reason = errors
          .map(({ property }) => property)
          .filter((property, i, arr) => arr.indexOf(property) === i)
          .map((property) => `${property} field is not valid`);
        throw new BadRequestException(...reason);
      }
      return object;
    } catch (e) {
      handleError(e);
    }
  }
}
