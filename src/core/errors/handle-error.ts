import { HttpException, InternalServerErrorException } from '@nestjs/common';

type HandleErrorProps = {
  message: string;
};

export function handleError(e: HandleErrorProps) {
  if (e instanceof HttpException) {
    throw e;
  }

  console.error(e.message);
  throw new InternalServerErrorException(`Something wrong. ${e.message}`);
}
