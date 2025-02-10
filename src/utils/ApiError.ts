export declare interface PayloadError {
  [key: string]: any;
}

export class ApiError extends Error {
  reason: string;
  message: string;
  code?: number;
  payload?: PayloadError;

  constructor(reason: string, message: string, payload?: PayloadError, code: number = 500) {
    super(message);
    this.message = message;
    this.reason = reason;
    this.code = code;
    this.payload = payload;
  }
}
