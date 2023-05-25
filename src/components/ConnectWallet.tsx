import { useWeb3Auth } from "@/contexts/web3Auth";
import { FC, useContext } from "react";
import { WALLET_ADAPTERS } from "@web3auth/base";
const ConnectWalletButton: FC = (props) => {
  const web3Auth = useWeb3Auth();
  const connectWallet = async () => {
    if (web3Auth) {
      // Login using JWT, either obtained from Firebase, Okta, Auth0 or bring your own JWT.
      const web3authProvider = await web3Auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: "jwt",
          extraLoginOptions: {
            id_token:
              "eyJraWQiOiIxYmI5NjA1YzM2ZTE2ODQ3NzY4NDA5NDM2OTM4NjgzMDIwMmIyZCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMjMiLCJ1c2VyIjoidGVzdCB1c2VyIiwiZW1haWwiOiJ0ZXN0QHRoZWEuZWFydGgiLCJhdWQiOiJ0aGVhLWludGVncmF0ZWQiLCJpc3MiOiJ0aGVhLWFwcCIsImp0aSI6IjBhMTQxMDc3LTRlY2QtNDA3Yi1iYjFjLTUwYmFmYzBiZTI2NiIsImlhdCI6MTY4NDk1NTAxMywiZXhwIjoxNjg0OTU1MDczfQ.jev2g9WOefvkc74AepEuef1qVLaUk346ho93HqZfvg0-z9DzwEoB2plmYi93aQwuuzicu19eKUi6l7Rk-v_3tPjf2zietlRI05ygXqZKPmf-Aatavrm7I7RtnDM_JPWbguSt9dPAb52whqmFoy-8aJpuGXaQp7vvxJZ-XnzpajJjPIrnW0Hsgyh7q4X4mTwiuvvQuPHH5Q2Ecwoc1tfwBGZVfZGXzoYJtK2Cp1ty7Hoh-UWlWXJOlyopeTmvrhyyg5oqxeUEGwLPNLNSibPTp3UULi2C9ikBscE2SxZtbMkZNICjTxEWT61i0mZqmtbe9MagUHBDLbjynmoT2B7a9w",
            verifierIdField: "email", // same as your JWT Verifier ID
          },
        }
      );
    }
  };
  return (
    <button
      className="shadow-none rounded bg-blue-500 text-white text-lg p-4 hover:bg-blue-600 active:bg-blue-700"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
