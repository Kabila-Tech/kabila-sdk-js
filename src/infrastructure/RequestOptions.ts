import { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
  limit: number;
  skip: number;
  fields: string[];
  search: string;
  orderBy: string | string[];
  orderDir: string | string[];
  auth: string; // HEADER: auth
  apiKey: string; // HEADER: x-api-key
  accountId: string; // HEADER: x-account-id
  ipValidator: string; // HEADER: x-ip-validation
  headers: { [key: string]: string };
}

export function buildRequestConfig(
  options: Partial<RequestOptions>,
  extraParams: { [key: string]: any } = {}
): AxiosRequestConfig {
  const params = new URLSearchParams();
  let headers: { [key: string]: string } = {};

  if (options.fields && options.fields.length > 0) {
    params.append('fields', options.fields.join(','));
  }

  if (options.limit) {
    params.append('limit', options.limit.toString());
  }

  if (options.skip) {
    params.append('skip', options.skip.toString());
  }

  if (options.search) {
    params.append('search', options.search);
  }

  if (options.orderBy) {
    params.append('orderBy', Array.isArray(options.orderBy) ? options.orderBy.join(',') : options.orderBy);
  }

  if (options.orderDir) {
    params.append('orderDir', Array.isArray(options.orderDir) ? options.orderDir.join(',') : options.orderDir);
  }

  for (const key in extraParams) {
    if (extraParams.hasOwnProperty(key)) {
      const value = extraParams[key];
      if (value != null) {
        if (Array.isArray(value)) {
          if (value.length > 0) params.append(key, value.join(','));
        } else {
          params.append(key, value);
        }
      }
    }
  }

  if (options.auth) {
    headers['auth'] = `Bearer ${options.auth}`;
  }

  if (options.apiKey) {
    headers['x-api-key'] = options.apiKey;
  }

  if (options.accountId) {
    headers['x-account-id'] = options.accountId;
  }

  if (options.ipValidator) {
    headers['x-ip-validation'] = options.ipValidator;
  }

  if (options.headers) {
    headers = { ...headers, ...options.headers };
  }

  const config: AxiosRequestConfig = {
    params: params,
    headers: headers
  };

  return config;
}
