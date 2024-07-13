import { PipeTransform, Injectable } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

/**
 * Transforms input data to boolean if it's boolean string
 * @param params Transform parameters
 */
export function toBooleanPipe({
  value,
}: Partial<TransformFnParams>): boolean | unknown {
  let res = value;

  if (value === 'false') {
    res = false;
  }

  if (value === 'true') {
    res = true;
  }

  return res;
}

/**
 * Pipe which transforms input data to boolean if it's boolean string
 * @see [Custom pipes - NestJS](https://docs.nestjs.com/pipes#custom-pipes)
 */
@Injectable()
export class ToBooleanPipe implements PipeTransform {
  /**
   * Implements transformation logic
   * @param value Value which need to transform
   */
  transform(value: unknown) {
    return toBooleanPipe({ value });
  }
}
