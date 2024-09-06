// app.js
const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAddress",
          "type": "address"
        }
      ],
      "name": "AccessGranted",
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
          "internalType": "address",
          "name": "revokedAddress",
          "type": "address"
        }
      ],
      "name": "AccessRevoked",
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
      "type": "function",
      "constant": true
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
      "type": "function",
      "constant": true
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
          "internalType": "uint256",
          "name": "_patientID",
          "type": "uint256"
        }
      ],
      "name": "getPatientByID",
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
      "type": "function",
      "constant": true
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
          "internalType": "address[]",
          "name": "patientAddresses",
          "type": "address[]"
        },
        {
          "internalType": "string[]",
          "name": "names",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ages",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "genders",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "insuranceCompanies",
          "type": "string[]"
        },
        {
          "internalType": "address[]",
          "name": "insuranceCompanyAddresses",
          "type": "address[]"
        },
        {
          "internalType": "address[][]",
          "name": "accessProvidedLists",
          "type": "address[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
            },
            {
              "internalType": "address[]",
              "name": "accessProvided",
              "type": "address[]"
            }
          ],
          "internalType": "struct PatientRecords.Patient[]",
          "name": "patientList",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_patientID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_addressPatientID",
          "type": "uint256"
        }
      ],
      "name": "grantAccess",
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
        },
        {
          "internalType": "uint256",
          "name": "_addressPatientID",
          "type": "uint256"
        }
      ],
      "name": "revokeAccess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

const contractAddress = '0xD04b6bc21Fd176f9241f5ae6752a10852741b49c'; // Replace with your contract address

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
    // Add_New_Patient
    const patientForm = document.getElementById('patientForm');

    // View_Existing_Patient
    const patientIDForm = document.getElementById('patientIDForm'); 
    const patientDetailsDiv = document.getElementById('patientDetails'); 




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

                // Estimate gas
                const gasEstimate = await PatientRecords.methods.addPatient(name, age, gender, insuranceCompany, insuranceCompanyAddress).estimateGas({ from: userAccount });

                // Send the transaction
                const receipt = await PatientRecords.methods.addPatient(name, age, gender, insuranceCompany, insuranceCompanyAddress)
                    .send({ from: userAccount, gas: gasEstimate });

                // Check if the transaction receipt is valid (i.e., transaction was successful)
                if (receipt && receipt.status) {
                    // Listen to the `PatientAdded` event from the receipt
                    const eventReturnValues = receipt.events.PatientAdded.returnValues;
                    const newPatientID = eventReturnValues.patientID;

                    // Show success message
                    alert("Patient record added successfully! Your patient ID is: " + newPatientID);

                    // Clear the form fields
                    patientForm.reset();
                } else {
                    throw new Error("Transaction failed");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to add patient record. Please check the details and try again.");
            }
        });
    }


    
   // Get Single Patient by ID
    if (patientIDForm) {
        patientIDForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const patientID = document.getElementById('patientID').value; 
            console.log("Patient ID:", patientID);

            try {
                const userAccount = await getUserAccount(); // Get the currently selected account

                if (!userAccount) {
                    console.error('No user account found.');
                    return; // Exit if there's an error getting the user account
                }

                console.log('User Account:', userAccount);

                // Call the getPatientByID function from the smart contract
                const result = await PatientRecords.methods.getPatientByID(patientID).call({ from: userAccount });
                console.log('Result from smart contract:', result);

                // Extract the returned values correctly
                const id = result[0].toString(); 
                const patientAddress = result[1];
                const name = result[2];
                const age = result[3].toString(); 
                const gender = result[4];
                const insuranceCompany = result[5];
                const insuranceCompanyAddress = result[6];
                const status = result[7];

                // Ensure patientDetailsDiv exists
                if (!patientDetailsDiv) {
                    console.error('Element with ID "patientDetails" not found.');
                    return;
                }

                // Display patient information
                patientDetailsDiv.innerHTML = ''; 

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

    // Update Insurance Company 
    const updateInsuranceForm = document.getElementById('updateInsuranceForm');

    // Function to update the insurance company details
    // Function to update the insurance company details
    if (updateInsuranceForm) {
        updateInsuranceForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const patientID = document.getElementById('patientID').value;
            const newInsuranceCompany = document.getElementById('insuranceCompany').value;
            const newInsuranceCompanyAddress = document.getElementById('insuranceCompanyAddress').value;

            try {
                const userAccount = await getUserAccount(); // Get the currently selected account

                if (!userAccount) {
                    console.error('No user account found.');
                    return; // Exit if there's an error getting the user account
                }

                console.log('User Account:', userAccount);

                // Check if the user has access to update this patient's record
                const patientInfo = await PatientRecords.methods.getPatientByID(patientID).call({ from: userAccount });
                const patientAddress = patientInfo[1]; // Assuming patientAddress is the 2nd element
                const status = patientInfo[7]; // Assuming status is the 8th element

                if (userAccount.toLowerCase() !== patientAddress.toLowerCase()) {
                    alert('You are not authorized to update this insurance company information.');
                    return; // Exit if the user is not the patient
                }

                if (status !== "Access granted") {
                    alert('You do not have access to update this information.');
                    return; // Exit if access is not granted
                }

                // Proceed to update the insurance company information
                const gasEstimate = await PatientRecords.methods.updateInsuranceCompany(patientID, newInsuranceCompany, newInsuranceCompanyAddress).estimateGas({ from: userAccount });

                const result = await PatientRecords.methods.updateInsuranceCompany(patientID, newInsuranceCompany, newInsuranceCompanyAddress).send({ from: userAccount, gas: gasEstimate });
                console.log('Result from smart contract:', result);
                alert('Insurance company information updated successfully.');

                updateInsuranceForm.reset()

            } catch (error) {
                console.error('Error details:', error);
                alert('Failed to update insurance company information. Check console for details.');
            }
        });
    }

    // Grant Access
    const grantAccessForm = document.getElementById('grantAccessForm');

    // Check if the form element is available

    if (grantAccessForm) {
        grantAccessForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const patientIDElement = document.getElementById('patientID');
            const addressToGrantIDElement = document.getElementById('addressToGrantID');

            if (!patientIDElement || !addressToGrantIDElement) {
                alert('Error: Required form elements not found.');
                return;
            }

            const patientID = patientIDElement.value;
            const addressToGrantID = addressToGrantIDElement.value;

            try {
                const userAccount = await getUserAccount();

                if (!userAccount) {
                    alert('Error: No user account found.');
                    return;
                }

                const patient = await PatientRecords.methods.patients(patientID).call();

                console.log(userAccount)
                console.log(patient.patientAddress)

                if (userAccount.toLowerCase() !== patient.patientAddress.toLowerCase()) {
                    alert('You are not authorized to grant access for this patient.');
                    return;
                }

                const addressPatient = await PatientRecords.methods.patients(addressToGrantID).call();
                
                if (addressPatient.patientAddress === '0x0000000000000000000000000000000000000000') {
                    alert(`Invalid patient ID: Patient ID ${addressToGrantID} does not exist.`);
                    return;
                }

                const accessProvided = patient.accessProvided || [];

                if (accessProvided.includes(addressPatient.patientAddress)) {
                    alert(`The address ${addressToGrantID} already has access.`);
                    return;
                }
                const gasEstimate = await PatientRecords.methods.grantAccess(patientID, addressToGrantID).estimateGas({ from: userAccount });

                await PatientRecords.methods.grantAccess(patientID, addressToGrantID).send({ from: userAccount, gas: gasEstimate });

                alert('Access granted successfully.');
            } catch (error) {
                console.error('Error details:', error);

                if (error.message.includes("Unauthorized")) {
                    alert('You are not authorized to grant access.');
                } else if (error.message.includes("Invalid patient ID")) {
                    alert(error.message);
                } else if (error.message.includes("This address already has access")) {
                    alert('The address already has access.');
                } else {
                    alert(`Error: ${error.message}`);
                }
            }
        });
    } else {
        console.error('Form element not found.');
    }

    // Revoke Access
    const revokeAccessForm = document.getElementById('revokeAccessForm');

    if (revokeAccessForm) {
        revokeAccessForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const patientIDElement = document.getElementById('patientID');
            const addressPatientIDElement = document.getElementById('addressPatientID');

            if (!patientIDElement || !addressPatientIDElement) {
                alert('Error: Required form elements not found.');
                return;
            }

            const patientID = patientIDElement.value;
            console.log(patientID)
            const addressPatientID = addressPatientIDElement.value;
            console.log(addressPatientID)

            try {
                const userAccount = await getUserAccount();

                if (!userAccount) {
                    alert('Error: No user account found.');
                    return;
                }

                // Fetch the patient data of the current user
                const patient = await PatientRecords.methods.patients(patientID).call();
                console.log(patient)

                if (userAccount.toLowerCase() !== patient.patientAddress.toLowerCase()) {
                    alert('You are not authorized to revoke access for this patient.');
                    return;
                }

                // Fetch the patient data of the address to revoke access from
                const addressPatient = await PatientRecords.methods.patients(addressPatientID).call();
                console.log(addressPatient)
                console.log(patient.accessProvided)
                
                // Estimate gas for the revokeAccess function
                const gasEstimate = await PatientRecords.methods.revokeAccess(patientID, addressPatientID).estimateGas({ from: userAccount });

                // Call revokeAccess on the smart contract
                await PatientRecords.methods.revokeAccess(patientID, addressPatientID).send({ from: userAccount, gas: gasEstimate });

                alert('Access revoked successfully.');
                
            } catch (error) {
                console.error('Error details:', error);

                if (error.message.includes("Unauthorized")) {
                    alert('You are not authorized to revoke access.');
                } else if (error.message.includes("Invalid patient ID")) {
                    alert(error.message);
                } else if (error.message.includes("Address not found in the access list")) {
                    alert('The address does not have access.');
                } else {
                    alert(`Error: ${error.message}`);
                }
            }
        });
    } else {
        console.error('Form element not found.');
    }

});
