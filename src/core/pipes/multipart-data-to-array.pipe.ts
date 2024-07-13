import { PipeTransform, Injectable } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function multipartDataToArrayPipe({
  value,
}: Partial<TransformFnParams>): unknown[] | undefined {
  const isValid = value === undefined || Array.isArray(value);

  if (isValid || typeof value !== 'string') {
    return value;
  }

  return value.split(',').map(Number);
}

/**
 * Pipe which transforms input data to array if it's not array or undefined
 * @see [Custom pipes - NestJS](https://docs.nestjs.com/pipes#custom-pipes)
 */
@Injectable()
export class MultipartDataToArrayPipe implements PipeTransform {
  /**
   * Implements transformation logic
   * @param value Value which need to transform
   */
  transform(value: unknown) {
    return multipartDataToArrayPipe({ value });
  }
}
