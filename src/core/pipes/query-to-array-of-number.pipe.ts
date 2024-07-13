import { PipeTransform, Injectable } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function queryToArrayOfNumberPipe({
  value,
}: Partial<TransformFnParams>): unknown[] | undefined {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(Number);
  } else {
    return [Number(value)];
  }
}

@Injectable()
export class ToArrayPipe implements PipeTransform {
  transform(value: unknown) {
    return queryToArrayOfNumberPipe({ value });
  }
}
