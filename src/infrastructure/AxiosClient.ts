import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handlerSuccessResponse, handlerError } from '../utils/ApiHandlers';

export class AxiosClient {
  private static axiosInstance: AxiosInstance;

  private constructor() {}

  public static initialize(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      headers: { 'Content-Type': 'application/json' },
      timeout: 0,
      ...config
    });

    // this.axiosInstance.interceptors.request.use(
    //   (config: InternalAxiosRequestConfig) => {
    //     console.log('🚀 ~ AxiosClient ~ initialize ~ config:', config.headers);
    //     return config;
    //   },

    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => handlerSuccessResponse(response) as any,
      (error: AxiosError) => {
        const apiError = handlerError(error);
        return Promise.reject(apiError);
      }
    );
  }

  public static getInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      throw new Error('Client not initialized. Call initialize() first.');
    }
    return this.axiosInstance;
  }
}
