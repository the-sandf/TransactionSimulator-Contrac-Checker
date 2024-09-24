import axios from 'axios';

export async function POST(req) {
  const { contractAddress, apiKey } = await req.json(); // Destructure apiKey from the request

  if (!contractAddress) {
    return new Response(JSON.stringify({ error: 'Contract address is required' }), { status: 400 });
  }

  // Use the passed API key instead of the environment variable
  const etherscanAPIKey = apiKey; // Now using the apiKey from the request body

  try {
    const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${etherscanAPIKey}`;
    
    const response = await axios.get(etherscanURL);
    const data = response.data;

    if (data.status === "1" && data.result[0].SourceCode) {
      return new Response(JSON.stringify({
        address: contractAddress,
        status: "Valid Contract",
        details: "Contract has verified source code."
      }));
    } else {
      return new Response(JSON.stringify({
        address: contractAddress,
        status: "Invalid Contract",
        details: "Contract address is not valid or source code is not verified."
      }));
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching contract information' }), { status: 500 });
  }
}
