"use client";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

// Context object to store the web3auth instance
const Web3AuthContext = createContext<Web3AuthNoModal | undefined>(undefined);
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

// A custom hook to access the context
export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};

const clientId =
  "BPzC0EqRrgec-gcCvL9MqGy2I_INt1rx2xomLNFqn09K-F5ElCWZOQ0UJsBXXrflmtBCQ7oZFATwzFampZ07nds";

export const Web3AuthProvider: FC<any> = (props) => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal>();

  // Initialize the web3auth instance once on mount
  useEffect(() => {
    const initWeb3Auth = async () => {
      console.log("Initializing web3auth");
      // Web3AuthNoModal - Constructor called
      const web3auth = new Web3AuthNoModal({
          clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x13881",
		  rpcTarget: "https://rpc-mumbai.maticvigil.com/"
        },
          web3AuthNetwork: "testnet",
          useCoreKitKey: false,
      });

      // Configue OpenloginAdapter
	 const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
		  // uxMode: "redirect",
            loginConfig: {
              jwt: {
                verifier: "demo_thea_testnet",
                typeOfLogin: "jwt",
                clientId,
              },
            },
          },
        });
      web3auth.configureAdapter(openloginAdapter);

      try {
        await web3auth.init();
        console.log("web3auth initialization complete");
      } catch (error) {
        console.log("web3auth initialization failed => ", error);
      }
      setWeb3Auth(web3auth);
    };
    initWeb3Auth();
  }, []);

  // Return the provider component with the context value
  return (
    <Web3AuthContext.Provider value={web3auth}>
      {props.children}
    </Web3AuthContext.Provider>
  );
};
