export interface ApiResult<T> {
  data: T;
  status: number;
  statusText: string;
  headers: {};
}
