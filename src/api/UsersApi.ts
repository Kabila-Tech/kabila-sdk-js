import { AxiosInstance } from 'axios';
import { AxiosClient } from '../infrastructure/AxiosClient';
import { buildRequestConfig, RequestOptions } from '../infrastructure/RequestOptions';
import { ApiResult } from '../infrastructure/entities/Result';

import { UpdateUser, User, UserBasic } from '../infrastructure/entities/User';
import { ENVIRONMENTS, getBaseUrl } from '../utils/Environment';

export class UserApi {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(environment: ENVIRONMENTS, baseUrl?: string) {
    this.axiosInstance = AxiosClient.getInstance();
    this.baseUrl = baseUrl ? baseUrl : getBaseUrl(environment, '5008');
  }

  /**
   * Logs in a user with the provided account ID, signature, and network.
   *
   * @param accountId - The ID of the user's account.
   * @param signature - The signature for authentication.
   * @param network - The network to which the user is connecting.
   * @returns A promise that resolves to an ApiResult containing the authentication token and public key.
   */
  public async login(
    accountId: string,
    signature: string,
    network: string
  ): Promise<ApiResult<{ token: string; publicKey: string }>> {
    const requestConfig = buildRequestConfig({});
    return this.axiosInstance.post<{ token: string; publicKey: string }>(
      `${this.baseUrl}/users/login`,
      { accountId, signature, network },
      requestConfig
    );
  }

  /**
   * Fetches a list of users based on the provided account IDs.
   *
   * @param accountIds - An optional array of account IDs to filter the users.
   * @param requestOptions - Optional configuration for the request.
   * @returns A promise that resolves to an ApiResult containing an array of User objects.
   */
  public async getUsers(
    accountIds?: string[],
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<User[]>> {
    const requestConfig = buildRequestConfig(requestOptions, { accountIds: accountIds });
    return this.axiosInstance.get<User[]>(`${this.baseUrl}/users`, requestConfig);
  }

  /**
   * Fetches basic information for a list of users.
   *
   * @param accountIds - An optional array of account IDs to fetch information for. If not provided, information for all users will be fetched.
   * @param requestOptions - Optional configuration for the request.
   * @returns A promise that resolves to an ApiResult containing an array of UserBasic objects.
   */
  public async getUsersBasicInfo(
    accountIds?: string[],
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<UserBasic>> {
    const requestConfig = buildRequestConfig(requestOptions, { accountIds: accountIds });
    return this.axiosInstance.get<UserBasic>(`${this.baseUrl}/users/basics`, requestConfig);
  }

  /**
   * Updates the user information.
   *
   * @param user - The user data to update.
   * @param requestOptions - Optional configuration for the request.
   * @returns A promise that resolves to the updated user data.
   */
  public async updateUser(
    user: UpdateUser,
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<UpdateUser>> {
    const requestConfig = buildRequestConfig(requestOptions);
    return this.axiosInstance.patch<UpdateUser>(`${this.baseUrl}/users`, user, requestConfig);
  }

  public async uploadUserPicture(
    file: File,
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<UpdateUser>> {
    const requestConfig = buildRequestConfig(requestOptions);
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.axiosInstance.put<UpdateUser>(`${this.baseUrl}/users/image`, formData, requestConfig);
  }
}
