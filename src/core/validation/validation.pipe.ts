import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { handleError } from '../errors/handle-error';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private toValidate(metatype: unknown): boolean {
    if (typeof metatype === 'function') {
      const types = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype as any);
    }

    return false;
  }

  public async transform(value: unknown, { metatype }: ArgumentMetadata) {
    try {
      if (!value || typeof value !== 'object') {
        return value;
      }
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }

      const object = plainToClass(metatype, value, {
        excludeExtraneousValues: true,
      });

      const errors = await validate(object, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const reason = errors
          .map(({ property }) => property)
          .filter((property, i, arr) => arr.indexOf(property) === i)
          .map((property) => `Invalid income field: ${property} `);
        console.debug('Input data from request:', value);
        console.debug('transform to class:', object);
        console.error('Validation error:', reason);
        throw new BadRequestException(reason);
      }
      return object;
    } catch (e) {
      handleError(e);
    }
  }
}
