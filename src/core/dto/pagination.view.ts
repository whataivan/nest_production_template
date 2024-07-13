import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationView {
  @Expose()
  @ApiProperty({
    description: 'Total number of records in the database',
    type: 'number',
    example: 100,
  })
  count: number;

  @Expose()
  @ApiProperty({
    description: 'Pagination page number',
    type: 'number',
    default: 1,
  })
  page: number;

  @Expose()
  @ApiProperty({
    description: 'Number of records on one page',
    type: 'number',
    default: 20,
  })
  rowsPerPage: number;
}
