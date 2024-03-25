import { IPaginateMeta } from "./pagination_meta.interface";

export interface IPaginateApiResponse<T> {
    meta: IPaginateMeta;
    data: T
}