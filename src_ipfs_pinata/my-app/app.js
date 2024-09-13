import { PinataSDK } from "pinata";

async function pushJson(data) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZWFkNzJlZC1jNDI1LTQ0YjUtYjEzZi03MTliZTBkMmQ5NTAiLCJlbWFpbCI6InNhcnRoYWthZ2dhcndhbDEyMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDhiNGE1ZTlkYTA3ZjI1ZDFiY2UiLCJzY29wZWRLZXlTZWNyZXQiOiI1ZGI2MjMyNTIxOGFkMmU0NDlkZjFjMTZlMDk5Y2ZjODQ2ODFiNjVjYWUzMGYyNmE0NjcyMjU5YTdmZWZjOGYxIiwiZXhwIjoxNzU3NzQ2MjE4fQ.0TIJrjd4cFdYPoFV0B4plKfvsEuRDTasWeahCQMHBsQ`
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

// pushJson({
//     name: "Sarthaktest2",
//     description: "This is a test JSON upload",
//     timestamp: new Date().toISOString(),
//   });



//import { PinataSDK } from "pinata";

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

pull('QmXe7R61zGBWdmATa8VxU78h773MbAKnMZKgtUi6wW8CzJ');



//await push();
//pull();

//await push();
