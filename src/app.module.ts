import {Module} from '@nestjs/common';

import {join} from "path";
import {PrismaModule} from "./prisma/prisma.module";
import {ServeStaticModule} from '@nestjs/serve-static';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
        isGlobal: true,
    }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'swagger-static'),
            serveRoot: '/swagger',
        }),
        PrismaModule,],
    controllers: [],
    providers: [],
})
export class AppModule {
}
