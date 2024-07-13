import {LocalStrategy} from "../core/strategies/local.strategy";
import {JwtStrategy} from "../core/strategies/jwt.strategy";
import {PrismaModule} from "../prisma/prisma.module";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Module} from "@nestjs/common";


const strategies = [LocalStrategy, JwtStrategy];

@Module({
    imports: [PrismaModule,],
    controllers: [
        // UserController, AuthController
    ],
    providers: [

        ...strategies,
        JwtService,
        // UserRepository,
        // AuthRepository,
        // UserService,
        ConfigService,
    ],
    exports: [],
})
export class UserModule {
}
