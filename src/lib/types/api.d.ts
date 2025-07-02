declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  error: string;
};
declare type PaginatedResponse<T> = {
  [key: string]: T;
  metadata: MetaData;
};
declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
