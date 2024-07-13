import { ApiProperty } from '@nestjs/swagger';
import { ISignInRes } from '../../../../shared/users/sign-in.res.interface';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignInDto implements ISignInRes {
  @IsString()
  @Expose()
  @ApiProperty({
    description: 'Password',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJhZG1pbiIsImRldmljZUlkIjoiNzI1MjQyNjQtMGE2My00NWYxLTlhMmMtZGRmMmQyMTcyYTY2IiwiaWF0IjoxNjk5NTQyOTU2LCJleHAiOjE2OTk1NDU1NDh9.lQx8l88uIu7tCQZmWzByOfG9o92r3s4qN8weGP\n' +
      '62O_I',
  })
  accessToken: string;
}
