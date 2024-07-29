import {IsInt, Max, Min} from "class-validator";
import {Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";


export class IdDto {
    @IsInt()
    @Min(1)
    @Max(100000000)
    @Expose()
    @Type(() => Number)
    @ApiProperty({
        description: 'Item ID',
        example: '1',
    })
    id: number;
}