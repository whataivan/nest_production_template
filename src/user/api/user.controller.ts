
import {ApiCreatedResponse, ApiOperation,} from '@nestjs/swagger';
import {ApiRoutes} from '../../core/config/api-routes.enum';
import {Controller} from '../../core/decorators/controller.decorator';

import {Get} from "@nestjs/common";


@Controller(ApiRoutes.users)
export class UserController {
    constructor() {
    }

    @ApiOperation({summary: "Get user"})
    // @Roles(Role.superadmin, Role.admin)
    @ApiCreatedResponse({
        description: 'Successful',

    })
    @Get()
    async get() {
       const result ='hi from api'
        return result;
    }


}
