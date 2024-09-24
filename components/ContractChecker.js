"use client";
import { useState } from 'react';
import axios from 'axios';

const ContractChecker = ({ account, apiKey }) => { // Accept apiKey as a prop
  const [contractAddress, setContractAddress] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/api/checkContract', {
        contractAddress,
        apiKey // Send the apiKey in the request body
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to validate contract address');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-md bg-black glow-effect my-6">
      <h2 className="mb-4 text-2xl font-bold text-blue-400">Contract Address Checker</h2>
      <form onSubmit={handleCheck} className="space-y-4">
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter contract address"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Check
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-black text-white rounded-md">
          <h3 className="text-xl font-semibold mb-2">Contract Information</h3>
          <p><strong>Contract Address:</strong> {result.address}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Details:</strong> {result.details}</p>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ContractChecker;
