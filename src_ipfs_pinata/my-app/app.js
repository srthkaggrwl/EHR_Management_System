import { PinataSDK } from "pinata";

async function pushJson(data) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer {$key}` // replace the bearer key
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.IpfsHash);
  } catch (error) {
    console.log(error);
  }
}


async function pull(cid_ipfs) {
  try {
    // Step 1: Fetch data from Pinata gateway
    const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid_ipfs}`;
    const dataResponse = await fetch(gatewayUrl);
    
    if (!dataResponse.ok) {
      throw new Error(`Error fetching data from gateway: ${dataResponse.statusText}`);
    }

    const data = await dataResponse.json();
    console.log("Data from IPFS:", data);

  } catch (error) {
    console.log("Error:", error);
  }
}




