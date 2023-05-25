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

export const Web3AuthProvider: FC<any> = (props) => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal>();

  // Initialize the web3auth instance once on mount
  useEffect(() => {
    const initWeb3Auth = async () => {
      console.log("Initializing web3auth");
      // Web3AuthNoModal - Constructor called
      const web3auth = new Web3AuthNoModal({
        clientId:
          "BB4zhbHOOGo82AtFhlun0RJo8QwIqu1A14u0yyw-esrg79OEupfm_33nQHPigI_yzvCn-EKmary6lM7xLMsm5YE",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x89",
        },
      });

      // Configue OpenloginAdapter
      const openloginAdapter = new OpenloginAdapter();
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
