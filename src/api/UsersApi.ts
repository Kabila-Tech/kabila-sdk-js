import { AxiosInstance } from 'axios';
import { AxiosClient } from '../infrastructure/AxiosClient';
import { buildRequestConfig } from '../infrastructure/RequestOptions';
import { ApiResult } from '../infrastructure/entities/Result';

import { KABILA_BASE_URL } from '../utils/Environment';

export class UserApi {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.axiosInstance = AxiosClient.getInstance();
    this.baseUrl = baseUrl ? baseUrl : KABILA_BASE_URL;
  }

  /**
   * Logs in a user with the provided account ID, signature, and network.
   *
   * @param accountId - The ID of the user's account.
   * @param signature - The signature for authentication.
   * @returns A promise that resolves to an ApiResult containing the authentication token and public key.
   */
  public async login(
    accountId: string,
    signature: string,
  ): Promise<ApiResult<{ token: string; publicKey: string }>> {
    const requestConfig = buildRequestConfig({});
    return this.axiosInstance.post<{ token: string; publicKey: string }>(
      `${this.baseUrl}/users/login`,
      { accountId, signature, network: 'mainnet' },
      requestConfig
    );
  }
}