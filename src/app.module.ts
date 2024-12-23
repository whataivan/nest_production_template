import { Module } from '@nestjs/common';

import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BaseController } from './core/controllers/base.controller';
import { JwtService } from '@nestjs/jwt';

const appModules = [UserModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: '/swagger',
    }),
    PrismaModule,
    ...appModules,
  ],

  controllers: [BaseController],
  providers: [JwtService, ConfigService],
})
export class AppModule {}
