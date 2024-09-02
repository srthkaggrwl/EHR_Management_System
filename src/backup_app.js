// app.js
const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");

const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "insuranceCompanyAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "patientIDs",
          "type": "uint256[]"
        }
      ],
      "name": "PatientsByInsuranceCompany",
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
          "internalType": "uint256",
          "name": "_patientID",
          "type": "uint256"
        },
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
      "name": "getPatient",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "patientID",
          "type": "uint256"
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
          "components": [
            {
              "internalType": "uint256",
              "name": "patientID",
              "type": "uint256"
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
      "type": "function",
      "constant": true
    }
  ]

const contractAddress = '0x2049196A499401607304Fb3891005776c17238B0'; // Replace with your contract address

// Ensure you have web3.js included
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Use the eth_requestAccounts method to request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const PatientRecords = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    const form = document.getElementById('patientForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const patientID = document.getElementById('patientID').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const insuranceCompany = document.getElementById('insuranceCompany').value || "";
        const insuranceCompanyAddress = document.getElementById('insuranceCompanyAddress').value || "0x0000000000000000000000000000000000000000";

        try {
            await PatientRecords.methods.addPatient(patientID, name, age, gender, insuranceCompany, insuranceCompanyAddress).send({ from: accounts[0], gas: 8000000 });
            alert("Patient record added successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to add patient record.");
        }
    });
});


    // Event listener for viewing patient details
//    const fetchPatientsButton = document.getElementById('fetchPatients');
//     if (fetchPatientsButton) {
//         fetchPatientsButton.addEventListener('click', async () => {
//             try {
//                 const [patientIDs, patientList] = await PatientRecords.methods.getAllPatients().call();
                
//                 // Check if patientList is an array and iterate over it
//                 if (Array.isArray(patientList)) {
//                     let patientsHTML = '<h2>All Patient Details:</h2>';
//                     patientList.forEach(patient => {
//                         patientsHTML += `
//                             <div>
//                                 <p><strong>ID:</strong> ${patient.patientID}</p>
//                                 <p><strong>Name:</strong> ${patient.name}</p>
//                                 <p><strong>Age:</strong> ${patient.age}</p>
//                                 <p><strong>Gender:</strong> ${patient.gender}</p>
//                                 <p><strong>Insurance Company:</strong> ${patient.insuranceCompany}</p>
//                                 <p><strong>Insurance Company Address:</strong> ${patient.insuranceCompanyAddress}</p>
//                             </div>
//                             <hr>
//                         `;
//                     });
//                     document.getElementById('patientInfo').innerHTML = patientsHTML;
//                 } else {
//                     console.error("Expected patientList to be an array, but got:", patientList);
//                     alert("Failed to fetch patient records1.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching patient records:", error);
//                 alert("Failed to fetch patient records2.");
//             }
//         });
//     }
