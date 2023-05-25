"use client";
import ConnectWalletButton from "@/components/ConnectWallet";
import { Web3AuthProvider } from "@/contexts/web3Auth";

export default function Home() {
  return (
    <Web3AuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex items-center justify-center min-h-screen min-w-full">
          <ConnectWalletButton />
        </div>
      </main>
    </Web3AuthProvider>
  );
}
