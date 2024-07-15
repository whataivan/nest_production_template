// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { UserRepository } from '../../user/infrastructure/user.repository';
//
// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
//   constructor(private usersRepository: UserRepository) {
//     super({
//       usernameField: 'login',
//       passwordField: 'password',
//     });
//   }
//
//   async validate(login: string, password: string): Promise<any> {
//     const candidate = await this.usersRepository.findOne(
//       { login },
//       { hashInclude: true },
//     );
//
//     if (!candidate) {
//       throw new UnauthorizedException();
//     }
//
//     const isValidPassword = bcrypt.compareSync(
//       password,
//       candidate.passwordHash || '',
//     );
//
//     if (!isValidPassword) {
//       throw new UnauthorizedException('login or password is not correct');
//     }
//     return candidate;
//   }
// }
