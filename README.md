# kabila-sdk-js

A JavaScript SDK for Kabila.

## Installation

```sh
npm install kabila-sdk-js
```

## Usage

### Calls that do not require login

```typescript
import { KabilaSdk, EnvironmentUtils } from 'kabila-sdk-js';

const kabilaSdk = new KabilaSdk(EnvironmentUtils.ENVIRONMENTS.DEVELOPMENT);
const accounts = ['0.0.2665305'];
const usersResult = await kabilaSdk.users.getUsersBasicInfo(accounts);

console.log('🚀 ~ getUsersBasicInfo ~ usersResult:', usersResult);
```

### Calls that require login

```typescript
import { KabilaSdk, AuthUtils, EnvironmentUtils, Project } from 'kabila-sdk-js';
import { getwalletProvider } from 'your-wallet-provider';
import { SignMessageParams } from '@hashgraph/hedera-wallet-connect';

const kabilaSdk = new KabilaSdk(EnvironmentUtils.ENVIRONMENTS.DEVELOPMENT);

const walletProvider = getwalletProvider();
const params: SignMessageParams = {
  signerAccountId: 'hedera:testnet:' + address,
  message: AuthUtils.getKabilaAuthMessage()
};

const { signatureMap } = await walletProvider.hedera_signMessage(params);

const {
  data: { token, publicKey }
} = await kabilaSdk.users.login(address!, signatureMap, 'testnet');

kabilaSdk.setAuth(token);

const notificationsResult = await kabilaSdk.notifications.getNotifications(Project.MARKET, { limit: 10 });

console.log('🚀 ~ hederaKabilaSdk ~ notifications:', notificationsResult);
```
