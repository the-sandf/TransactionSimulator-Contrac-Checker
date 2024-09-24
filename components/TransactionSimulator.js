"use client";
import { useState, useEffect } from 'react';
import { BrowserProvider, parseEther, formatEther, parseUnits, formatUnits } from 'ethers';

const fetchGasTracker = async (etherscanAPIKey) => {
    try {
        const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanAPIKey}`);
        const data = await response.json();
        return {
            low: parseFloat(data.result.SafeGasPrice),
            average: parseFloat(data.result.ProposeGasPrice),
            high: parseFloat(data.result.FastGasPrice),
        };
    } catch (error) {
        console.error("Error fetching gas prices:", error);
        return { low: 0, average: 0, high: 0 };
    }
};

export default function TransactionSimulator({ account, apiKey }) {
    const [transactionData, setTransactionData] = useState({
        to: '',
        value: '',
        data: '',
        gasLimit: '21000',
        gasPrice: '',
    });
    const [simulationResult, setSimulationResult] = useState(null);
    const [network, setNetwork] = useState('sepolia');
    const [gasTracker, setGasTracker] = useState({ low: 0, average: 0, high: 0 });

    useEffect(() => {
        const fetchGasPrices = async () => {
            const tracker = await fetchGasTracker(apiKey); // Use the apiKey prop here
            setGasTracker(tracker);
        };
        fetchGasPrices();
        const intervalId = setInterval(fetchGasPrices, 5000);
        return () => clearInterval(intervalId);
    }, [apiKey]); // Include apiKey in the dependency array

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransactionData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateEstimatedFee = (gasLimit, gasPrice) => {
        const gasPriceInWei = parseUnits(gasPrice || gasTracker.average.toString(), "gwei");
        const gasLimitInWei = BigInt(gasLimit);
        return formatEther(gasPriceInWei * gasLimitInWei);
    };

    const simulateTransaction = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();
            const block = await provider.getBlock("latest");
            const baseFeePerGas = block.baseFeePerGas ? BigInt(block.baseFeePerGas) : BigInt(0);

            const maxPriorityFeePerGas = parseUnits('2', 'gwei');
            const maxFeePerGas = baseFeePerGas * BigInt(2) + maxPriorityFeePerGas;

            const tx = {
                to: transactionData.to,
                value: parseEther(transactionData.value),
                data: transactionData.data || '0x',
                gasLimit: BigInt(transactionData.gasLimit || '21000'),
                maxFeePerGas,
                maxPriorityFeePerGas,
            };

            const gasEstimate = await provider.estimateGas(tx);
            const gasCostInEth = formatEther(maxFeePerGas * BigInt(gasEstimate));

            setSimulationResult({
                status: 'Simulation Successful',
                gasEstimate: gasEstimate.toString(),
                maxFeePerGas: formatUnits(maxFeePerGas, 'gwei'),
                maxPriorityFeePerGas: formatUnits(maxPriorityFeePerGas, 'gwei'),
                gasCostInEth,
            });
        } catch (error) {
            setSimulationResult({ error: error.message });
        }
    };

    const getTransactionRecommendation = (gasPrice) => {
        const price = parseFloat(gasPrice);
        if (price <= gasTracker.low) return 'Low - Cheapest, but may delay transaction.';
        if (price <= gasTracker.average) return 'Market - Average speed and cost.';
        return 'Aggressive - Fastest but most expensive.';
    };

    return (
        <div className="transaction-simulator bg-black p-8 my-6 rounded-lg shadow-lg max-w-md mx-auto text-white glow-effect">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Simulate Transaction</h3>
            <div className="gas-prices bg-gray-800 p-4 rounded-lg mb-6">
                <p>Current Gas Prices (in Gwei):</p>
                <p>Low: {gasTracker.low}</p>
                <p>Average: {gasTracker.average}</p>
                <p>High: {gasTracker.high}</p>
            </div>
            
            <label>
                To Address:
                <input className='text-black' type="text" name="to" value={transactionData.to} onChange={handleInputChange} placeholder="0xRecipientAddress" required />
            </label>
            <label>
                Value (ETH):
                <input className='text-black' type="text" name="value" value={transactionData.value} onChange={handleInputChange} placeholder="0.1" required />
            </label>
            <label>
                Data (Optional):
                <input className='text-black' type="text" name="data" value={transactionData.data} onChange={handleInputChange} placeholder="0x" />
            </label>
            <label>
                Gas Limit (Default 21,000 for simple transactions):
                <input className='text-black' type="text" name="gasLimit" value={transactionData.gasLimit} onChange={handleInputChange} placeholder="21000" />
            </label>
            <label>
                Gas Price (Gwei):
                <input className='text-black' type="text" name="gasPrice" value={transactionData.gasPrice} onChange={handleInputChange} placeholder={`Recommended: ${gasTracker.low} - ${gasTracker.high}`} />
            </label>
            <label className="block">Network:</label>
            <select
                name="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="sepolia">Sepolia</option>
                <option value="mainnet">Mainnet</option>
            </select>
            <button onClick={simulateTransaction} className="btn-simulate mt-2 ">
                Simulate Transaction
            </button>
            {simulationResult && (
                <div className="simulation-result">
                    {simulationResult.error ? (
                        <p style={{ color: 'red' }}>Error: {simulationResult.error}</p>
                    ) : (
                        <div>
                            <p>Status: {simulationResult.status}</p>
                            <p>Gas Estimate: {simulationResult.gasEstimate} units</p>
                            <p>Gas Price: {simulationResult.maxFeePerGas} Gwei</p>
                            <p>Estimated Fee: {simulationResult.gasCostInEth} ETH</p>
                            <p>Recommendation: {getTransactionRecommendation(transactionData.gasPrice)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
