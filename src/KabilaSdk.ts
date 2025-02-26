import { AxiosClient } from './infrastructure/AxiosClient';
import { UserApi } from './api/UsersApi';


export class KabilaSdk {
  public users: UserApi;
  private auth?: string;

  public constructor(
    baseUrls: {
      users?: string;
      filesManager?: string;
      notifications?: string;
      market?: string;
    } | string = {}
  ) {
    AxiosClient.initialize();
    const urls = typeof baseUrls != 'string' ? 
      baseUrls 
      : 
      { 
        users: baseUrls, 
        fileManager: baseUrls, 
        notifications: baseUrls, 
        market: baseUrls 
      };
    this.users = new UserApi(urls.users);
  }

  /**
   * Sets the authentication token for the client.
   *
   * @param token - The authentication token to be set.
   */
  public setAuth(token: string) {
    this.auth = `Bearer ${token}`;
    const axiosInstance = AxiosClient.getInstance();
    axiosInstance.defaults.headers.common['auth'] = this.auth;
  }

  /**
   * Retrieves the authentication token.
   *
   * @returns {string | undefined} The authentication token if available, otherwise undefined.
   */
  public getAuth(): string | undefined {
    return this.auth;
  }
}
