import {PickType} from "@nestjs/swagger";
import {UserEntity} from "../../../domain/user.entity";

export class UserIdDto extends PickType(UserEntity,["id"]){}