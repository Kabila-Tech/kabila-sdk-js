# kabila-sdk-js-private

A JavaScript SDK for Kabila.

## Installation

```sh
npm install kabila-sdk-js
```

## Usage

### Get auth bearer token:

```ts
import { KabilaSdk, AuthUtils, } from 'kabila-sdk-js';
import { getwalletProvider } from 'your-wallet-provider';
import { SignMessageParams } from '@hashgraph/hedera-wallet-connect';

const kabilaSdk = new KabilaSdk(EnvironmentUtils.ENVIRONMENTS.DEVELOPMENT);

const walletProvider = getwalletProvider();
const params: SignMessageParams = {
  signerAccountId: 'hedera:mainnet:' + address,
  message: AuthUtils.getKabilaAuthMessage()
};

const { signatureMap } = await walletProvider.hedera_signMessage(params);

const {
  data: { token, publicKey }
} = await kabilaSdk.users.login(address!, signatureMap);

console.log("🚀 ~ token:", token)
```
