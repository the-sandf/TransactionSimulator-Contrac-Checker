"use client"; // This component runs on the client-side
import { useState, useEffect } from 'react';

export default function LoginForm({ onLogin }) {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        // Remove API key from local storage when the component unmounts
        return () => {
            localStorage.removeItem('ETHERSCAN_API_KEY');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (apiKey) {
            // Store API key in local storage
            localStorage.setItem('ETHERSCAN_API_KEY', apiKey);
            onLogin(apiKey); // Call the onLogin prop to pass the API key to parent
        }
    };

    const redirectToEtherscan = () => {
        window.open('https://etherscan.io/myapikey', '_blank'); // Replace with the actual Etherscan AIP creation URL
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <form className="bg-blue-500 p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-white text-2xl mb-4">Login with Etherscan API Key</h2>
                <label className="block mb-2 text-white">
                    Etherscan API Key:
                    <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required
                        className="w-full p-2 rounded"
                        placeholder="Enter your Etherscan API Key"
                    />
                </label>
                <button type="submit" className="w-full bg-white text-blue-500 py-2 rounded">
                    Login
                </button>
                <p className="text-white mt-4">
                    <button 
                        type="button" 
                        onClick={redirectToEtherscan} 
                        className="text-yellow-400 underline">
                        Create New AIP
                    </button>
                </p>
            </form>
        </div>
    );
}
