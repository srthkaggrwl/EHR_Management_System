// app.js
const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "oldInsuranceCompany",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "oldInsuranceCompanyAddress",
          "type": "address"
        }
      ],
      "name": "InsuranceCompanyDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "oldInsuranceCompany",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "oldInsuranceCompanyAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newInsuranceCompany",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newInsuranceCompanyAddress",
          "type": "address"
        }
      ],
      "name": "InsuranceCompanyUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "PatientAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "patientIDs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "patients",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "gender",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "insuranceCompany",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "insuranceCompanyAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_gender",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_insuranceCompany",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_insuranceCompanyAddress",
          "type": "address"
        }
      ],
      "name": "addPatient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        }
      ],
      "name": "getPatientByAddress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "gender",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "insuranceCompany",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "insuranceCompanyAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllPatients",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "patientIDsList",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "patientID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "gender",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "insuranceCompany",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "insuranceCompanyAddress",
              "type": "address"
            }
          ],
          "internalType": "struct PatientRecords.Patient[]",
          "name": "patientList",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_patientID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_newInsuranceCompany",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_newInsuranceCompanyAddress",
          "type": "address"
        }
      ],
      "name": "updateInsuranceCompany",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_patientID",
          "type": "uint256"
        }
      ],
      "name": "deleteInsuranceCompany",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPatientsByInsuranceCompany",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "patientIDsList",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "patientID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "patientAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "gender",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "insuranceCompany",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "insuranceCompanyAddress",
              "type": "address"
            }
          ],
          "internalType": "struct PatientRecords.Patient[]",
          "name": "patientList",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]

const contractAddress = '0x78F37270d67A93782869a0eF2f95Ec989f2FB16b'; // Replace with your contract address

let PatientRecords; // Define in a broader scope
let accounts; // Define in a broader scope

// Ensure you have web3.js included
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Use the eth_requestAccounts method to request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    PatientRecords = new web3.eth.Contract(abi, contractAddress);
});

async function getUserAccount() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            return accounts[0]; // Use the first account
        } else {
            throw new Error('No MetaMask accounts found.');
        }
    } catch (error) {
        console.error('Error getting user account:', error.message);
        alert('Failed to get user account. Please ensure MetaMask is connected.');
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const patientForm = document.getElementById('patientForm');
    const fetchPatientsButton = document.getElementById('fetchPatients');
    const patientDetailsDiv = document.getElementById('patientDetails');
    const patientAddressForm = document.getElementById('patientAddressForm'); 

    // Add New Patient


    if (patientForm) {
        patientForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const insuranceCompany = document.getElementById('insuranceCompany').value || "";
            const insuranceCompanyAddress = document.getElementById('insuranceCompanyAddress').value || "0x0000000000000000000000000000000000000000";

            try {
                const userAccount = await getUserAccount(); // Get the currently selected account

                const gasEstimate = await PatientRecords.methods.addPatient(name, age, gender, insuranceCompany, insuranceCompanyAddress).estimateGas({ from: userAccount });

                await PatientRecords.methods.addPatient(name, age, gender, insuranceCompany, insuranceCompanyAddress).send({ from: userAccount, gas: gasEstimate });

                alert("Patient record added successfully!");
            } catch (error) {
                console.error(error);
                alert("Failed to add patient record.");
            }
        });
    }

    
    // Get Single Patient by Address
    if (patientAddressForm) {
        patientAddressForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const patientID = document.getElementById('patientAddress').value; // Ensure this matches the input ID in HTML
            console.log("Patient ID:", patientID);

            try {
                const userAccount = await getUserAccount(); // Get the currently selected account

                if (!userAccount) {
                    return; // Exit if there's an error getting the user account
                }

                console.log('User Account:', userAccount);

                // Call the getPatient function from the smart contract
                const result = await PatientRecords.methods.getPatientByAddress(patientID).call({ from: userAccount });
                console.log('Result from smart contract:', result);

                // Extract the returned values correctly
                const id = result[0].toString(); // Convert BigInt to string
                const patientAddress = result[1];
                const name = result[2];
                const age = result[3].toString(); // Convert BigInt to string
                const gender = result[4];
                const insuranceCompany = result[5];
                const insuranceCompanyAddress = result[6];
                const status = result[7];

                // Display patient information
                patientDetailsDiv.innerHTML = ''; // Clear existing content

                if (status === "Access granted") {
                    patientDetailsDiv.innerHTML = `
                        <p>Patient ID: ${id}</p>
                        <p>Patient Address: ${patientAddress}</p>
                        <p>Name: ${name}</p>
                        <p>Age: ${age}</p>
                        <p>Gender: ${gender}</p>
                        <p>Insurance Company: ${insuranceCompany}</p>
                        <p>Insurance Company Address: ${insuranceCompanyAddress}</p>
                        <p>Status: ${status}</p>
                    `;
                } else if (status === "Unauthorized access") {
                    patientDetailsDiv.innerHTML = '<p>You are not authorized to view these patient details.</p>';
                } else {
                    patientDetailsDiv.innerHTML = '<p>Patient not found or access denied.</p>';
                }
            } catch (error) {
                console.error('Error fetching patient details:', error.message);
                alert("Failed to fetch patient details. Check console for details.");
            }
        });
    }
});
