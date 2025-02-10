import { KabilaSdk } from '../KabilaSdk';
import { ENVIRONMENTS } from '../utils/Environment';

describe('Users API Tests', () => {
  let apiClient: KabilaSdk;

  beforeAll(() => {
    apiClient = new KabilaSdk((process.env.ENVIRONMENT as ENVIRONMENTS) || ENVIRONMENTS.DEVELOPMENT);
  });

  describe('getUsersBasicInfo', () => {
    it('should get users', async () => {
      const accounts = ['0.0.2665305'];
      const result = await apiClient.users.getUsersBasicInfo(accounts);
      console.log('🚀 ~ it ~ result:', result);
    });
  });
});
