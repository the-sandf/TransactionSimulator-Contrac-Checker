"use client";
import { useState } from 'react';
import { BrowserProvider } from 'ethers';

export default function Navbar({ onConnect }) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  // Function to connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setAccount(userAddress);
        setIsConnected(true);
        onConnect(userAddress); // Pass the connected account to the parent component
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <nav className="p-4 bg-blue-600 text-white shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">My DApp</h1>
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Connect MetaMask
        </button>
      ) : (
        <p>Connected: {account}</p>
      )}
    </nav>
  );
}
