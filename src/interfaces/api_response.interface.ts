export interface IApiResponse<T = any> {
    code: number;
    status: string;
    message?: string;
    errors?: any;
    result: T
}