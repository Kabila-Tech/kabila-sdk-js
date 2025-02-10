import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from './ApiError';
import { ApiResult } from '../infrastructure/entities/Result';

export function handlerSuccessResponse<T>(response: AxiosResponse<T, any>): ApiResult<T> {
  const { data, status, statusText, headers } = response;
  return { data, status, statusText, headers };
}

export function handlerError(e: any): ApiError {
  console.log('🚀 ~ kabila-sdk-js handlerError ~ e:', JSON.stringify(e));
  if (e instanceof AxiosError) {
    const { response: { data: { reason = '', message = '', payload = {} } = {}, status } = {} } = e;
    return new ApiError(reason, message, payload, status);
  }

  return new ApiError('UNCONTROLED ERROR', e.message, {}, 500);
}
