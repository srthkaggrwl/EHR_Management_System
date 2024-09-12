import { create } from 'ipfs-http-client';  // For IPFS interaction
import CryptoJS from 'crypto-js';  // For encryption

// Connect to the local IPFS node
const ipfs = create('http://localhost:5001');

// Function to encrypt the data and store it on IPFS
async function encryptAndStoreToIPFS() {
    // Get the user input
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const insuranceCompany = document.getElementById('insuranceCompany').value || "";
    const insuranceCompanyAddress = document.getElementById('insuranceCompanyAddress').value || "0x0000000000000000000000000000000000000000";

    // Combine all the data into an object
    const userData = {
        name,
        age,
        gender,
        insuranceCompany,
        insuranceCompanyAddress
    };

    // Convert the object into a string for encryption
    const userDataString = JSON.stringify(userData);

    // Encrypt the data using AES
    const secretKey = "a3f7bc6d7f8a9d1e7a2a3c4b5d6f8a9c";  // You should store and manage this key securely
    const encryptedData = CryptoJS.AES.encrypt(userDataString, secretKey).toString();

    try {
        // Add the encrypted data to IPFS
        const result = await ipfs.add(encryptedData);
        console.log('Encrypted data stored on IPFS with CID:', result.path);

        // Return the CID to the user
        return result.path;
    } catch (error) {
        console.error('Error uploading encrypted data to IPFS:', error);
        return null;
    }
}

// Call the function when needed, e.g., on a button click
document.getElementById('submit-button').addEventListener('click', async () => {
    const cid = await encryptAndStoreToIPFS();
    if (cid) {
        alert(`Data stored on IPFS. CID: ${cid}`);
    }
});
