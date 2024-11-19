# Blockchain-Based Healthcare Record Management System

This project is a decentralized Electronic Healthcare Record (EHR) Management System built using **Solidity**, **Truffle**, **Ganache**, and **MetaMask**. The project integrates **IPFS (via Pinata)** for decentralized file storage and provides secure, tamper-proof healthcare data management.

---

## Features
- **Patient Data Management:** Add, retrieve, and manage patient records securely.
- **Smart Contract-Based Access Control:** Ensures privacy and restricted access to data.
- **IPFS + Pinata Integration:** Decentralized storage with easy retrieval.
- **Scalability and Security:** Transparent and tamper-proof record management.

---

## Prerequisites
Ensure the following tools are installed before starting:
- **Node.js**: [Download here](https://nodejs.org) (v16+ recommended).
- **Truffle Suite**: `npm install -g truffle`
- **Ganache**: [Download Ganache](https://trufflesuite.com/ganache/).
- **MetaMask**: Add the [MetaMask browser extension](https://metamask.io/).
- **Pinata Account**: Sign up at [Pinata](https://pinata.cloud/).

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/srthkaggrwl/EHR_Management_System
cd healthcare-records-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Ganache
1. Open **Ganache** and create a new workspace or use a quickstart workspace.
2. Copy the RPC server URL (e.g., `http://127.0.0.1:7545`) for the next steps.

### 4. Configure MetaMask
1. Open **MetaMask** and switch to the Ethereum test network.
2. Import Ganache accounts:
   - In Ganache, click the **key icon** next to each account to copy the private key.
   - In MetaMask, go to **Import Account**, paste the private key, and complete the import.
3. Ensure the MetaMask network RPC matches the Ganache RPC URL.

### 5. Compile and Deploy Smart Contracts
1. Compile contracts:
   ```bash
   truffle compile
   ```
2. Deploy contracts:
   ```bash
   truffle migrate --network development
   ```
3. Copy the deployed **contract address** from the console output.

### 6. Update Contract Address in the Code
Replace the placeholder contract address in the frontend integration code (`app.js` or `interact.js`) with the new contract address:
```javascript
const contractAddress = "DEPLOYED_CONTRACT_ADDRESS_HERE";
```

---

## Pinata Integration
Pinata provides IPFS capabilities for storing and retrieving patient records.

### Steps to Integrate Pinata
1. **Sign Up**: Create an account at [Pinata](https://pinata.cloud/).
2. **Generate API Keys**:
   - Go to the Pinata Dashboard → **API Keys**.
   - Generate a new key, enabling permissions for uploading and retrieving files.
   - Copy the **API Key** and **Secret**.
3. **Update `.env` File**:
   Create a `.env` file in the project root:
   ```plaintext
   PINATA_API_KEY=your_api_key
   PINATA_API_SECRET=your_api_secret
   ```
4. **Add Pinata Logic to Backend**:
   Ensure the backend code uses Pinata for uploading records:
   ```javascript
   const axios = require('axios');

   const uploadToPinata = async (data) => {
       const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
       const response = await axios.post(url, data, {
           headers: {
               pinata_api_key: process.env.PINATA_API_KEY,
               pinata_secret_api_key: process.env.PINATA_API_SECRET,
           },
       });
       return response.data.IpfsHash; // Returns the IPFS hash (CID)
   };
   ```

5. **Connect Patient Records to IPFS**:
   Update the smart contract interaction to include the IPFS hash:
   ```javascript
   const ipfsHash = await uploadToPinata(patientData);
   const transaction = contract.methods.addPatient(ipfsHash, ...otherArgs).send({ from: account });
   ```

---

## Running the Application
1. Start the application server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Connect your MetaMask account to the application.

---

## Key Configuration Changes with Deployment
Every time the contract is re-deployed:
1. **Update Contract Address**:
   Replace the contract address in the integration code (`app.js` or similar).
2. **Reset MetaMask Network**:
   If needed, reconnect your MetaMask to the new Ganache workspace.

---

## Future Enhancements
- **IoT Integration**: Real-time data collection for enhanced patient monitoring.
- **Machine Learning**: Predictive analytics for healthcare data.
- **Role-Based Access Control**: More granular permissions for different user roles.

---

Feel free to contribute and share feedback! For queries, open an issue or contact [Sarthak Aggarwal](mailto:sarthakaggarwal120@gmail.com@example.com). 😊
