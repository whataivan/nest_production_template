import { PipeTransform, Injectable } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

/**
 * Transforms input data to array if it's not array or undefined
 * @param params Transform parameters
 */
export function toArrayPipe({
  value,
}: Partial<TransformFnParams>): unknown[] | undefined {
  const isValid = value === undefined || Array.isArray(value);

  if (isValid) {
    return value;
  }

  return [value];
}

/**
 * Pipe which transforms input data to array if it's not array or undefined
 * @see [Custom pipes - NestJS](https://docs.nestjs.com/pipes#custom-pipes)
 */
@Injectable()
export class ToArrayPipe implements PipeTransform {
  /**
   * Implements transformation logic
   * @param value Value which need to transform
   */
  transform(value: unknown) {
    return toArrayPipe({ value });
  }
}
