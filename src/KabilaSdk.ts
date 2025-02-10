import { AxiosClient } from './infrastructure/AxiosClient';
import { UserApi } from './api/UsersApi';
import { NotificationsApi } from './api/NotificationsApi';
import { ENVIRONMENTS } from './utils/Environment';

export class KabilaSdk {
  public users: UserApi;
  public notifications: NotificationsApi;
  private auth?: string;

  public constructor(
    environment: ENVIRONMENTS,
    auth?: string,
    baseUrls: {
      users?: string;
      filesManager?: string;
      notifications?: string;
    } = {}
  ) {
    AxiosClient.initialize();
    this.users = new UserApi(environment, baseUrls.users);
    this.notifications = new NotificationsApi(environment, baseUrls.notifications);
    if (auth) {
      this.setAuth(auth);
    }
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
