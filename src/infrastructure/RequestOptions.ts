import { AxiosRequestConfig } from 'axios';

export enum Format {
  WITH_PAGINATION = 'WITH_PAGINATION',
  NO_PAGINATION = 'NO_PAGINATION',
}

export interface RequestOptions {
  limit: number;
  skip: number;
  fields: string[];
  search: string;
  orderBy: string | string[];
  orderDir: string | string[];
  format: Format;
  auth: string; // HEADER: auth
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

  if (options.format) {
    params.append('format', options.format);
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

  if (options.headers) {
    headers = { ...headers, ...options.headers };
  }

  const config: AxiosRequestConfig = {
    params: params,
    headers: headers,
  };

  return config;
}
