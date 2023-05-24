# demo-web3auth-jwt

This is web3auth guide: https://web3auth.io/docs/quick-start?product=Plug+and+Play&sdk=Plug+and+Play+Web+No+Modal+SDK&platform=React

**step 1**
npm install --save @web3auth/no-modal

**step 2**
```
import { Web3AuthNoModal } from "@web3auth/no-modal";

//Initialize within your constructor
const web3auth = new Web3AuthNoModal({
  clientId: "BB4zhbHOOGo82AtFhlun0RJo8QwIqu1A14u0yyw-esrg79OEupfm_33nQHPigI_yzvCn-EKmary6lM7xLMsm5YE", // Get your Client ID from Web3Auth Dashboard
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x89", // Use 0x13881 for Mumbai Testnet
  },
});

await web3auth.init();
```
 
**step 2**
Add button Connect wallet. Onclick - request:
```
POST https://client.dev.thea.earth/b2b/generateJWT?apikey=123456
{
"sub":"123",
"user": "test user",
"email":"test@thea.earth"
}
```

**step 3**
Extract `result` value from response. And do:
```
// Login using JWT, either obtained from Firebase, Okta, Auth0 or bring your own JWT.
const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
  loginProvider: "jwt",
  extraLoginOptions: {
    id_token: "eyJraWQiOiIxYmI5NjA1YzM2ZTE2ODQ3NzY4NDA5NDM2OTM4NjgzMDIwMmIyZCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMjMiLCJ1c2VyIjoidGVzdCB1c2VyIiwiZW1haWwiOiJ0ZXN0QHRoZWEuZWFydGgiLCJhdWQiOiJ0aGVhLWludGVncmF0ZWQiLCJpc3MiOiJ0aGVhLWFwcCIsImp0aSI6IjBhMTQxMDc3LTRlY2QtNDA3Yi1iYjFjLTUwYmFmYzBiZTI2NiIsImlhdCI6MTY4NDk1NTAxMywiZXhwIjoxNjg0OTU1MDczfQ.jev2g9WOefvkc74AepEuef1qVLaUk346ho93HqZfvg0-z9DzwEoB2plmYi93aQwuuzicu19eKUi6l7Rk-v_3tPjf2zietlRI05ygXqZKPmf-Aatavrm7I7RtnDM_JPWbguSt9dPAb52whqmFoy-8aJpuGXaQp7vvxJZ-XnzpajJjPIrnW0Hsgyh7q4X4mTwiuvvQuPHH5Q2Ecwoc1tfwBGZVfZGXzoYJtK2Cp1ty7Hoh-UWlWXJOlyopeTmvrhyyg5oqxeUEGwLPNLNSibPTp3UULi2C9ikBscE2SxZtbMkZNICjTxEWT61i0mZqmtbe9MagUHBDLbjynmoT2B7a9w", // in JWT Format
    verifierIdField: "email", // same as your JWT Verifier ID
  },
});

```
