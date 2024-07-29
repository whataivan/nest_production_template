// import {LocalStrategy} from "../core/strategies/local.strategy";
// import {JwtStrategy} from "../core/strategies/jwt.strategy";
import {PrismaModule} from "../prisma/prisma.module";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Module} from "@nestjs/common";
import {UserRepository} from "./infrastructure/user.repository";
import {UserController} from "./api/user.controller";


const strategies = [ ];

@Module({
    imports: [PrismaModule,],
    controllers: [
        // AuthController
        UserController
    ],
    providers: [

        ...strategies,
        JwtService,
        UserRepository,
        // AuthRepository,
        // UserService,
        ConfigService,
    ],
    exports: [],
})
export class UserModule {
}
