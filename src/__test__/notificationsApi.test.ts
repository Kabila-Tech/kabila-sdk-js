import { KabilaSdk } from '../KabilaSdk';
import { Project } from '../infrastructure/entities/Notification';
import { ENVIRONMENTS } from '../utils/Environment';

describe('Notifications API Tests', () => {
  let apiClient: KabilaSdk;

  beforeAll(() => {
    apiClient = new KabilaSdk((process.env.ENVIRONMENT as ENVIRONMENTS) || ENVIRONMENTS.DEVELOPMENT);
  });

  describe('getNotifications', () => {
    it('should get notifications', async () => {
      const notifications = await apiClient.notifications.getNotifications(Project.PLAZAS, { limit: 10 });
      console.log('🚀 ~ it ~ notifications:', notifications);
    });
  });
});
