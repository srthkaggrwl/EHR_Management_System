import { create } from 'ipfs-http-client';  // Use 'import' instead of 'require'
import CryptoJS from 'crypto-js';  // Import CryptoJS for AES encryption/decryption

// Connect to the local IPFS node (default port 5001)
const ipfs = create('http://localhost:5001');

async function addDataToIPFS(data) {
    try {
        // Convert the user data object to a JSON string
        const userDataString = JSON.stringify(data);

        // Encrypt the data using AES encryption
        const secretKey = "a3f7bc6d7f8a9d1e7a2a3c4b5d6f8a9c";  // Ensure you manage this key securely in production
        const encryptedData = CryptoJS.AES.encrypt(userDataString, secretKey).toString();
        console.log(encryptedData)

        // Add the encrypted data to IPFS
        const result = await ipfs.add(encryptedData);
        console.log('Data added to IPFS. CID:', result.path);


        // Fetch the data back using the CID and decrypt it
        const fetchedData = [];
        for await (const chunk of ipfs.cat(result.path)) {
            fetchedData.push(chunk);
        }
        
        const encryptedFetchedData = Buffer.concat(fetchedData).toString();
        console.log(encryptedFetchedData)
        // Decrypt the fetched data
        const decryptedDataBytes = CryptoJS.AES.decrypt(encryptedFetchedData, secretKey);
        const decryptedData = decryptedDataBytes.toString(CryptoJS.enc.Utf8);

        console.log('Decrypted fetched data from IPFS:', decryptedData);

    } catch (error) {
        console.error('Error uploading/fetching data to/from IPFS:', error);
    }
}

// Correctly formatted user data object
addDataToIPFS({
    name: "Sarthak",
    age: 21,
    gender: "male"
});
