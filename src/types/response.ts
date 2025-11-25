declare type SuccessResponseI<T = null> = {
  message: string;
  success: true;
  data: T;
  token?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
declare type ErrorResponseI = {
  message: string;
  success: false;
  error: unknown;
};
export declare type ResponseI<T = null> = SuccessResponseI<T> | ErrorResponseI;

declare interface ListOf<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}