import { AxiosInstance } from 'axios';
import { AxiosClient } from '../infrastructure/AxiosClient';
import { buildRequestConfig, RequestOptions } from '../infrastructure/RequestOptions';
import { ApiResult } from '../infrastructure/entities/Result';
import { ENVIRONMENTS, getBaseUrl } from '../utils/Environment';
import { Project, UpdateNotification, Notification } from '../infrastructure/entities/Notification';

export class NotificationsApi {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(environment: ENVIRONMENTS, baseUrl?: string) {
    this.axiosInstance = AxiosClient.getInstance();
    this.baseUrl = baseUrl ? baseUrl : getBaseUrl(environment, '5006');
  }

  /**
   * Fetches notifications for a given project.
   *
   * @param project - The project for which to fetch notifications.
   * @param requestOptions - Optional request options to customize the API request.
   * @returns A promise that resolves to an ApiResult containing an array of notifications.
   */
  public async getNotifications(
    project: Project,
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<Notification[]>> {
    const requestConfig = buildRequestConfig(requestOptions, { project: project });
    return this.axiosInstance.get<Notification[]>(`${this.baseUrl}/notifications`, requestConfig);
  }

  /**
   * Marks notifications as read.
   *
   * @param updateNotifications - The notification update payload.
   * @param requestOptions - Optional request options to customize the request.
   * @returns A promise that resolves to the API result containing the updated notification.
   */
  public async markAsReadNotifications(
    updateNotifications: UpdateNotification,
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<Notification>> {
    const requestConfig = buildRequestConfig(requestOptions);
    return this.axiosInstance.patch<Notification>(`${this.baseUrl}/notifications`, updateNotifications, requestConfig);
  }

  /**
   * Deletes a notification by its ID.
   *
   * @param id - The ID of the notification to delete.
   * @param requestOptions - Optional configuration for the request.
   * @returns A promise that resolves to an ApiResult containing an empty string.
   */
  public async deleteNotification(id: string, requestOptions: Partial<RequestOptions> = {}): Promise<ApiResult<''>> {
    const requestConfig = buildRequestConfig(requestOptions);
    return this.axiosInstance.delete<''>(`${this.baseUrl}/notifications/${id}`, requestConfig);
  }

  /**
   * Deletes all notifications with the specified IDs.
   *
   * @param ids - An array of notification IDs to delete. Maximum of 25 IDs.
   * @param requestOptions - Optional request options to customize the request.
   * @returns A promise that resolves to an ApiResult containing an empty string.
   */
  public async deleteAllNotifications(
    ids: string[], // Max 25 ids
    requestOptions: Partial<RequestOptions> = {}
  ): Promise<ApiResult<''>> {
    const requestConfig = buildRequestConfig(requestOptions);
    requestConfig.data = { ids };
    return this.axiosInstance.delete<''>(`${this.baseUrl}/notifications`, requestConfig);
  }
}
