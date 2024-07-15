import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IPaginationParams} from "../interfaces/pagination-params.intergace";
import { SortDirectionEnum} from "../enums/sort-direction.enum";

export class PaginationParamsDto implements IPaginationParams {
  @ApiProperty({
    description: 'Specifies the field to sort by',
    required: false,
  })
  @IsOptional()
  @Expose()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description:
      'Specifies the direction of sorting. Valid parameters: "desc", "asc"',
    required: false,
  })
  @IsOptional()
  @Expose()
  @IsString()
  @IsIn(['desc', 'asc'])
  sortDirection?: SortDirectionEnum;

  @ApiProperty({
    description: 'Specifies the pagination page number',
    default: 1,
    required: false,
  })
  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Transform(({ value }) => value ?? 1)
  page?: number;

  @ApiProperty({
    description: 'Number of records per page for pagination',
    default: 20,
    required: false,
  })
  @IsOptional()
  @Expose()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @Transform(({ value }) => value ?? 20)
  rowsPerPage?: number;
}
