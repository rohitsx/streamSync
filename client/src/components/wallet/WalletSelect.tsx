import React, { useEffect, useState } from "react";

interface Wallet {
  name: string;
  icon: string;
  adapter: string;
}

const WalletSelect: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    // In a real implementation, you would detect installed wallets here
    // For this example, we'll use dummy data
    setWallets([
      { name: "Phantom", icon: "phantom.png", adapter: "phantom" },
      { name: "Solflare", icon: "solflare.png", adapter: "solflare" },
      // Add more wallets as needed
    ]);
  }, []);

  const handleWalletSelect = (adapter: string) => {
    // Here you would implement the actual wallet connection logic
    console.log(`Connecting to ${adapter}`);
    // After successful connection:
    chrome.runtime.sendMessage({
      action: "walletConnected",
      publicKey: "dummy_public_key",
    });
    window.close(); // Close the tab after connection
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Select a Solana Wallet</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {wallets.map((wallet) => (
          <button
            key={wallet.adapter}
            onClick={() => handleWalletSelect(wallet.adapter)}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p>{wallet.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletSelect;
