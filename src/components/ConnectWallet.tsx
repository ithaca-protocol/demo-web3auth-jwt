import { useWeb3Auth } from "@/contexts/web3Auth";
import { FC, useContext } from "react";
import { WALLET_ADAPTERS } from "@web3auth/base";
import RPC from "./evm.ethers";
const ConnectWalletButton: FC = (props) => {
  const web3Auth = useWeb3Auth();
  
  
const connectWallet = async () => {
    try {
      if (web3Auth) {
	  
		web3Auth.logout();
	  
        // call generateJWT
        fetch("https://client.dev.thea.earth/b2b/generateJWT?apikey=123456", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: "123456",
            email: "minas.abramyan@gmail.com",
            user: "Minas Abramyan",
          }),
        })
          .then((response) => response.json())
          .then(async (data) => {
            console.log("GeneratedJWT data => ", data);
            const { result } = data;
            // Conect to wallet
            const provider = await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
              loginProvider: "jwt",
              extraLoginOptions: {
                id_token: result,
                verifierIdField: "email",
				domain: "http://localhost:3000",
              },
            });
			
			const rpc = new RPC(provider);
			const balance = await rpc.getBalance();
			const address = await rpc.getAccounts();
			alert(address + " : " + balance);
			
          })
          .catch((error) => console.log("Failed to generateJWT => ", error));
      }
    } catch (error) {
      console.log("Failed to connect => ", error);
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
