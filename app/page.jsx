"use client"; // This component runs on the client-side
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TransactionSimulator from '../components/TransactionSimulator';
import ContractChecker from '../components/ContractChecker';
import LoginForm from '../components/LoginForm'; // Import the LoginForm component

export default function Home() {
  const [account, setAccount] = useState(null);
  const [apiKey, setApiKey] = useState('');

  // Handle connection and pass account to the simulator
  const handleConnect = (connectedAccount) => {
    setAccount(connectedAccount);
  };

  // Check local storage for API key on initial load
  useEffect(() => {
    const storedApiKey = localStorage.getItem('ETHERSCAN_API_KEY');
    if (storedApiKey) {
      setApiKey(storedApiKey); // Set the API key from local storage
    }
  }, []);

  // Handle login
  const handleLogin = (key) => {
    setApiKey(key);
  };

  return (
    <div>
      <Navbar />
      {!apiKey ? (
        <LoginForm onLogin={handleLogin} /> // Show the login form if no API key is set
      ) : (
        <>
          <TransactionSimulator account={account} apiKey={apiKey} /> 
          <ContractChecker account={account} apiKey={apiKey} /> 
        </>
      )}
    </div>
  );
}
