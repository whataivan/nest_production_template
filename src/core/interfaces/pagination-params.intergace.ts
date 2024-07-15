import { SortDirectionEnum} from "../enums/sort-direction.enum";

export interface IPaginationParams {
  sortBy?: string;
  sortDirection?: SortDirectionEnum;
  page?: number;
  rowsPerPage?: number;
}
