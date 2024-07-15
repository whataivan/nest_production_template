// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import {
//   ForbiddenException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { UserRepository } from '../../user/infrastructure/user.repository';
// import { AuthRepository } from '../../user/infrastructure/auth.repository';
// import { TokenPayloadType } from '../../user/application/interfaces/token-payload.type';
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     private usersRepo: UserRepository,
//     private readonly authRepository: AuthRepository,
//     private configService: ConfigService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: true,
//       secretOrKey: configService.get('JWT_ACCESS_SECRET'),
//     });
//   }
//
//   async validate({ userId, deviceId }: TokenPayloadType) {
//     const session = await this.authRepository.findSession({ deviceId });
//     if (!session) throw new ForbiddenException('Auth session does not exist');
//     const user = await this.usersRepo.findOne({ userId });
//
//     if (!user) throw new NotFoundException();
//     user.session = session;
//     return user;
//   }
// }
