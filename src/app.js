// app.js
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
          "indexed": true,
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldInsuranceCompanyAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newInsuranceCompanyAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cid",
          "type": "string"
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
          "name": "cid",
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
          "internalType": "string",
          "name": "cid",
          "type": "string"
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
          "name": "_cid",
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
      "inputs": [],
      "name": "getAllPatients",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "patientIDsList",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "cids",
          "type": "string[]"
        },
        {
          "internalType": "address[][]",
          "name": "accessGrantedLists",
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
          "internalType": "string",
          "name": "cid",
          "type": "string"
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_patientID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_addressToGrant",
          "type": "address"
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
          "internalType": "address",
          "name": "_addressToRevoke",
          "type": "address"
        }
      ],
      "name": "revokeAccess",
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
          "internalType": "address",
          "name": "_newInsuranceCompanyAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_oldInsuranceCompanyAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_cid",
          "type": "string"
        }
      ],
      "name": "updateInsuranceCompany",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

// Ensure Web3 is available
const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
//const web3 = new Web3(Web3.givenProvider || "HTTP://139.59.86.36:8545");


const contractAddress = '0xA0e8A8c85E6f3F7461dc16c39266bE8e13081Fa8'; // Replace with your contract address

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



// Ensure this is placed after the IPFS library is included in HTML
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
    console.log('Data uploaded to IPFS. CID:', result.IpfsHash);
    return result.IpfsHash;
  } catch (error) {
    console.log('Error uploading data to IPFS:', error);
    throw error;
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
    return data

  } catch (error) {
    console.log("Error:", error);
  }
}




// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // Debugging statement
    const patientForm = document.getElementById('patientForm');


    if (patientForm) {
    patientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const insuranceCompany = document.getElementById('insuranceCompany').value || "";
        const insuranceCompanyAddress = document.getElementById('insuranceCompanyAddress').value || "0x0000000000000000000000000000000000000000";

        try {

            // Get the currently selected account
            const userAccount = await getUserAccount();

            // Prepare the user data object
            const userData = {
                patientAddress: userAccount,
                name,
                age,
                gender,
                insuranceCompany,
                insuranceCompanyAddress
            };
            
            // Encrypt the data and store it on IPFS
            const cid = await pushJson(userData);
            console.log('CID returned from IPFS:', cid);

            // Verify the CID by pulling the data
            const pulledData = await pull(cid);
            console.log('Data pulled from IPFS:', pulledData);

          
            // Estimate gas for the transaction
            const gasEstimate = await PatientRecords.methods.addPatient(cid, insuranceCompanyAddress).estimateGas({ from: userAccount });
            const receipt = await PatientRecords.methods.addPatient(cid, insuranceCompanyAddress).send({ from: userAccount, gas: gasEstimate });

            // Check if the transaction receipt is valid
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



    // View_Existing_Patient
    const patientIDForm = document.getElementById('patientIDForm'); 
    const patientDetailsDiv = document.getElementById('patientDetails'); 
    
    //Get Single Patient by ID
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
              const cid = result[1]; // Extract CID from the result
              const status = result[2];

              // Ensure patientDetailsDiv exists
              const patientDetailsDiv = document.getElementById('patientDetails');
              if (!patientDetailsDiv) {
                  console.error('Element with ID "patientDetails" not found.');
                  return;
              }

              // Check access status and fetch data from IPFS
              if (status === "Access granted") {
                  // Fetch the patient data from IPFS using the CID
                  const pulledData = await pull(cid);
                  console.log('Data pulled from IPFS:', pulledData);

                  // Display patient information along with data from IPFS
                  patientDetailsDiv.innerHTML = `
                      <p>Patient ID: ${id}</p>
                      <p>Patient Address: ${pulledData.patientAddress}</p>
                      <p>CID: ${cid}</p>
                      <p>Name: ${pulledData.name}</p>
                      <p>Age: ${pulledData.age}</p>
                      <p>Gender: ${pulledData.gender}</p>
                      <p>Insurance Company: ${pulledData.insuranceCompany}</p>
                      <p>Insurance Company Address: ${pulledData.insuranceCompanyAddress}</p>
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
          console.log(patientID);
          console.log(addressToGrantID);

          try {
              const userAccount = await getUserAccount();

              if (!userAccount) {
                  alert('Error: No user account found.');
                  return;
              }

              // Fetch patient data from the contract (this gives us CID stored on-chain)
              const patient = await PatientRecords.methods.patients(patientID).call();

              // Pull the patient's data from IPFS using CID
              const cid = patient.cid;  // Retrieve CID from the patient data in the contract
              console.log('CID from contract:', cid);

              // Fetch the patient data stored on IPFS using the CID
              const patientData = await pull(cid);  // `pull` is a function to retrieve data from IPFS
              console.log('Patient data from IPFS:', patientData);

              // Now, compare the `patientAddress` from IPFS with the user account
              const patientAddressFromIPFS = patientData.patientAddress;
              console.log('Patient Address from IPFS:', patientAddressFromIPFS);

              if (userAccount.toLowerCase() !== patientAddressFromIPFS.toLowerCase()) {
                  alert('You are not authorized to grant access for this patient.');
                  return;
              }

              // Fetch the data of the patient who is being granted access (optional check)
              const addressPatient = await PatientRecords.methods.patients(addressToGrantID).call();

              // Validate if the patient to grant access exists on the chain
              if (addressPatient.patientAddress === '0x0000000000000000000000000000000000000000') {
                  alert(`Invalid patient ID: Patient ID ${addressToGrantID} does not exist.`);
                  return;
              }

              // Check if the address is already in the accessProvided list
              const accessProvided = patientData.accessProvided || [];

              if (accessProvided.includes(addressPatient.patientAddress)) {
                  alert(`The address ${addressToGrantID} already has access.`);
                  return;
              }

              // Estimate gas for the transaction
              const gasEstimate = await PatientRecords.methods.grantAccess(patientID, addressToGrantID).estimateGas({ from: userAccount });

              // Grant access by calling the smart contract
              const receipt = await PatientRecords.methods.grantAccess(patientID, addressToGrantID).send({ from: userAccount, gas: gasEstimate });

              console.log('Transaction receipt:', receipt);

              if (receipt.status) {
                  // Update the accessProvided list locally
                  accessProvided.push(addressPatient.patientAddress);

                  // Update the patient data on IPFS with the new accessProvided list
                  patientData.accessProvided = accessProvided;
                  const newCid = await pushJson(patientData);  // Push updated data to IPFS and get new CID
                  console.log('New CID after updating IPFS:', newCid);

                  // Call the smart contract to update the CID with the new one
                  // const updateReceipt = await PatientRecords.methods.updatePatientCID(patientID, newCid).send({ from: userAccount, gas: gasEstimate });
                  // console.log('Updated CID on blockchain:', updateReceipt);

                  alert('Access granted and updated successfully.');
              } else {
                  throw new Error("Transaction failed");
              }
          } catch (error) {
              console.error('Error details:', error);

              if (error.message.includes("Unauthorized")) {
                  alert('You are not authorized to grant access.');
              } else if (error.message.includes("Invalid patient ID")) {
                  alert(error.message);
              } else if (error.message.includes("This address already has access")) {
                  alert('The address already has access.');
              } else {
                  alert(`Invalid Request`);
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
          const addressToRevokeElement = document.getElementById('addressPatientID');

          if (!patientIDElement || !addressToRevokeElement) {
              alert('Error: Required form elements not found.');
              return;
          }

          const patientID = patientIDElement.value;
          const addressToRevoke = addressToRevokeElement.value;
          console.log(patientID);
          console.log(addressToRevoke);

          try {
              const userAccount = await getUserAccount();

              if (!userAccount) {
                  alert('Error: No user account found.');
                  return;
              }

              // Fetch the patient data from the contract
              const patient = await PatientRecords.methods.patients(patientID).call();
              const cid = patient.cid;  // Retrieve CID from the patient data
              console.log('CID from contract:', cid);

              // Pull the patient data from IPFS using the CID
              const patientData = await pull(cid);  // `pull` is a function to retrieve data from IPFS
              console.log('Patient data from IPFS:', patientData);

              // Check if the current user is authorized to revoke access
              if (userAccount.toLowerCase() !== patientData.patientAddress.toLowerCase()) {
                  alert('You are not authorized to revoke access for this patient.');
                  return;
              }

              // Check if the address to revoke exists in the accessProvided list
              const accessProvided = patientData.accessProvided || [];
              console.log(accessProvided)
              const addressIndex = accessProvided.indexOf(addressToRevoke.toLowerCase());
              console.log(addressIndex)

              // if (addressIndex === -1) {
              //     alert(`The address ${addressToRevoke} does not have access.`);
              //     return;
              // }

              // Estimate gas for the revokeAccess function
              const gasEstimate = await PatientRecords.methods.revokeAccess(patientID, addressToRevoke).estimateGas({ from: userAccount });

              // Call revokeAccess on the smart contract
              const receipt = await PatientRecords.methods.revokeAccess(patientID, addressToRevoke).send({ from: userAccount, gas: gasEstimate });

              console.log('Transaction receipt:', receipt);

              if (receipt.status) {
                  // Fetch the updated patient data from the smart contract or IPFS
                  const updatedPatientData = await pull(cid);  // Optionally fetch new data after update
                  console.log('Updated Patient data from IPFS:', updatedPatientData);

                  alert('Access revoked successfully.');
              } else {
                  throw new Error("Transaction failed");
              }

          } catch (error) {
              console.error('Error', error);

              if (error.message.includes("Unauthorized")) {
                  alert('You are not authorized to revoke access.');
              } else if (error.message.includes("Invalid patient ID")) {
                  alert(error.message);
              } else if (error.message.includes("Address not found in the access list")) {
                  alert('The address does not have access.');
              } else {
                  alert(`Invalid Request`);
              }
          }
      });
  } else {
      console.error('Form element not found.');
  }



  // Update Insurance Company
  const updateInsuranceForm = document.getElementById('updateInsuranceForm');
  if (updateInsuranceForm) {
      updateInsuranceForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const patientID = document.getElementById('patientID').value;
          const newInsuranceCompany = document.getElementById('insuranceCompany').value;
          const newInsuranceCompanyAddress = document.getElementById('insuranceCompanyAddress').value;

          try {
              const userAccount = await getUserAccount();

              if (!userAccount) {
                  console.error('No user account found.');
                  return;
              }

              console.log('User Account:', userAccount);
              // Fetch the patient data from the contract
              const patient = await PatientRecords.methods.patients(patientID).call();
              const cid = patient.cid;  // Retrieve CID from the patient data
              console.log('CID from contract:', cid);

              // Pull the patient data from IPFS using the CID
              const patientData = await pull(cid);  // `pull` is a function to retrieve data from IPFS
              console.log('Patient data from IPFS:', patientData);

              if (!patientData) {
                  throw new Error('Failed to fetch patient data from IPFS.');
              }

              const oldInsuranceCompanyAddress = patientData.insuranceCompanyAddress;

              // Update patient data and push new CID to IPFS
              patientData.insuranceCompany = newInsuranceCompany;
              patientData.insuranceCompanyAddress = newInsuranceCompanyAddress;

              const updatedCid = await pushJson(patientData);

              if (userAccount.toLowerCase() !== patientData.patientAddress.toLowerCase()) {
                  alert('You are not authorized to update this insurance company information.');
                  return;
              }

              const gasEstimate = await PatientRecords.methods.updateInsuranceCompany(
                  patientID,
                  oldInsuranceCompanyAddress,
                  newInsuranceCompanyAddress,
                  updatedCid
              ).estimateGas({ from: userAccount });

              const result = await PatientRecords.methods.updateInsuranceCompany(
                  patientID,
                  oldInsuranceCompanyAddress,
                  newInsuranceCompanyAddress,
                  updatedCid
              ).send({ from: userAccount, gas: gasEstimate });

              console.log('Result from smart contract:', result);
              alert('Insurance company information updated successfully.');

              updateInsuranceForm.reset();

          } catch (error) {
              console.error('Error details:', error);
              alert('Failed to update insurance company information. Check console for details.');
          }
      });
  } else {
      console.error('Update Insurance Form element not found.');
  }



});
