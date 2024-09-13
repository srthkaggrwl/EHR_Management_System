// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecords {
    struct Patient {
        uint patientID;
        string cid; // Store CID instead of detailed patient data
        address[] accessGranted; // List of addresses that have access
    }

    mapping(uint => Patient) public patients;
    uint[] public patientIDs;

    event PatientAdded(uint patientID, string cid);
    event AccessGranted(uint indexed patientID, address indexed newAddress);
    event AccessRevoked(uint patientID, address revokedAddress);


    // Add patient data with CID and manage access rights
    function addPatient(
        string memory _cid,
        address _insuranceCompanyAddress
    ) public {

        uint newPatientID = patientIDs.length > 0 ? patientIDs[patientIDs.length - 1] + 1 : 1;
        
        Patient storage newPatient = patients[newPatientID];

        // Initialize the Patient fields
        newPatient.patientID = newPatientID;
        newPatient.cid = _cid;
        
        // Create and populate the accessGranted array in storage
        newPatient.accessGranted.push(msg.sender);               // Add the sender's address
        newPatient.accessGranted.push(_insuranceCompanyAddress); // Add the insurance company's address

        // Add patientID to the list of IDs
        patientIDs.push(newPatientID);

        emit PatientAdded(newPatientID, _cid);

        
    }

    function getAllPatients()
        public
        view
        returns (
            uint[] memory patientIDsList,
            string[] memory cids,
            address[][] memory accessProvidedLists
        )
    {   
        uint length = patientIDs.length;

        // Create memory arrays for each patient property
        string[] memory _cids = new string[](length);
        address[][] memory _accessProvidedLists = new address[][](length);  // Array of arrays

        for (uint i = 0; i < length; i++) {
            uint patientID = patientIDs[i];
            Patient storage patient = patients[patientID];

            // Populate memory arrays with patient data
            _cids[i] = patient.cid;
            _accessProvidedLists[i] = patient.accessGranted;  // Store dynamic access list
        }
        
        // Return patient IDs, CIDs, and accessGranted lists
        return (
            patientIDs,
            _cids,
            _accessProvidedLists
        );
    }


    function getPatientByID(uint _patientID)
        public
        view
        returns (
            uint patientID,
            string memory cid,
            string memory status
        )
    {
        uint length = patientIDs.length;

        // Check if there are no patient records
        if (length == 0) {
            return (0, "", "No records found");
        }

        Patient memory patient;
        bool found = false;

        // Find the patient by the provided patientID
        for (uint i = 0; i < length; i++) {
            if (patients[patientIDs[i]].patientID == _patientID) {
                patient = patients[patientIDs[i]];
                found = true;
                break;
            }
        }

        // Check if the patient was found
        if (!found) {
            return (0, "", "Patient not found");
        }

        // Check if msg.sender is in the accessGranted array
        bool accessGranted = false;
        for (uint j = 0; j < patient.accessGranted.length; j++) {
            if (patient.accessGranted[j] == msg.sender) {
                accessGranted = true;
                break;
            }
        }

        // If access is granted, return the patientID and CID
        if (accessGranted) {
            return (
                patient.patientID,
                patient.cid,
                "Access granted"
            );
        } else {
            return (0, "", "Unauthorized access");
        }
    }
}

//     function updateInsuranceCompany(
//         uint _patientID,
//         string memory _newInsuranceCompany,
//         address _newInsuranceCompanyAddress
//     ) public {
//         Patient storage patient = patients[_patientID];

//         // Allow update only if the caller is the patient
//         require(
//             msg.sender == patient.patientAddress,
//             "Unauthorized: Only the patient can update this record."
//         );

//         string memory oldInsuranceCompany = patient.insuranceCompany;
//         address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

//         // Update the insurance company details
//         patient.insuranceCompany = _newInsuranceCompany;
//         patient.insuranceCompanyAddress = _newInsuranceCompanyAddress;

//         // Replace old insurance company address in the accessProvided array with the new address
//         bool replaced = false;
//         for (uint i = 0; i < patient.accessProvided.length; i++) {
//             if (patient.accessProvided[i] == oldInsuranceCompanyAddress) {
//                 patient.accessProvided[i] = _newInsuranceCompanyAddress;
//                 replaced = true;
//                 break;
//             }
//         }

//         // If the old insurance company address was not found in the array, add the new address
//         if (!replaced) {
//             patient.accessProvided.push(_newInsuranceCompanyAddress);
//         }

//         emit InsuranceCompanyUpdated(
//             _patientID,
//             oldInsuranceCompany,
//             oldInsuranceCompanyAddress,
//             _newInsuranceCompany,
//             _newInsuranceCompanyAddress
//         );
//     }

//     function deleteInsuranceCompany(uint _patientID) public {
//         Patient storage patient = patients[_patientID];

//         // Allow deletion only if the caller is the patient
//         require(
//             msg.sender == patient.patientAddress,
//             "Unauthorized: Only the patient can delete the insurance company."
//         );

//         string memory oldInsuranceCompany = patient.insuranceCompany;
//         address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

//         // Reset the insurance company details
//         patient.insuranceCompany = "";
//         patient.insuranceCompanyAddress = address(0);

//         // Revoke access by removing the old insurance company address from the accessProvided array
//         for (uint i = 0; i < patient.accessProvided.length; i++) {
//             if (patient.accessProvided[i] == oldInsuranceCompanyAddress) {
//                 // Remove the address by shifting the elements in the array
//                 for (uint j = i; j < patient.accessProvided.length - 1; j++) {
//                     patient.accessProvided[j] = patient.accessProvided[j + 1];
//                 }
//                 patient.accessProvided.pop(); // Reduce the array length
//                 break; // Exit the loop once the insurance company address is found and removed
//             }
//         }

//         emit InsuranceCompanyDeleted(_patientID, oldInsuranceCompany, oldInsuranceCompanyAddress);
//     }

//     function getPatientsByInsuranceCompany()
//         public
//         view
//         returns (
//             uint[] memory patientIDsList,
//             Patient[] memory patientList
//         )
//     {
//         address insuranceCompanyAddress = msg.sender;
//         uint length = patientIDs.length;
//         uint count = 0;

//         // First, count how many patients have granted access to the caller (insurance company)
//         for (uint i = 0; i < length; i++) {
//             Patient memory patient = patients[patientIDs[i]];
//             for (uint j = 0; j < patient.accessProvided.length; j++) {
//                 if (patient.accessProvided[j] == insuranceCompanyAddress) {
//                     count++;
//                     break; // Break once the address is found
//                 }
//             }
//         }

//         // Create arrays to hold the results
//         uint[] memory ids = new uint[](count);
//         Patient[] memory patientsList = new Patient[](count);

//         uint index = 0;
//         for (uint i = 0; i < length; i++) {
//             Patient memory patient = patients[patientIDs[i]];
//             for (uint j = 0; j < patient.accessProvided.length; j++) {
//                 if (patient.accessProvided[j] == insuranceCompanyAddress) {
//                     ids[index] = patientIDs[i];
//                     patientsList[index] = patient;
//                     index++;
//                     break; // Break once the address is found
//                 }
//             }
//         }

//         return (ids, patientsList);
//     }

//     function grantAccess(uint _patientID, uint _addressPatientID) public {
//         // Get the patient record for the patient granting access
//         Patient storage patient = patients[_patientID];
        
//         // Get the patient record for the patient receiving access
//         Patient storage addressPatient = patients[_addressPatientID];

//         // Only the patient can grant access
//         require(
//             msg.sender == patient.patientAddress,
//             "Unauthorized: Only the patient can grant access."
//         );
        
//         // Check if the addressPatientID exists
//         require(
//             addressPatient.patientAddress != address(0),
//             "Invalid patient ID: Patient to grant access, does not exist."
//         );

//         // Check if the address is already in the accessProvided list
//         bool alreadyHasAccess = false;
//         for (uint i = 0; i < patient.accessProvided.length; i++) {
//             if (patient.accessProvided[i] == addressPatient.patientAddress) {
//                 alreadyHasAccess = true;
//                 break;
//             }
//         }

//         require(
//             !alreadyHasAccess,
//             "This address already has access."
//         );

//         // Add the new address to the accessProvided list
//         patient.accessProvided.push(addressPatient.patientAddress);

//         emit AccessGranted(_patientID, addressPatient.patientAddress);
//     }


//     function revokeAccess(uint _patientID, uint _addressPatientID) public {
//         // Get the patient record for the patient revoking access
//         Patient storage patient = patients[_patientID];

//         // Get the patient record for the patient whose access is being revoked
//         Patient storage addressPatient = patients[_addressPatientID];

//         // Only the patient can revoke access
//         require(
//             msg.sender == patient.patientAddress,
//             "Unauthorized: Only the patient can revoke access."
//         );

//         // Check if the addressPatientID exists
//         require(
//             addressPatient.patientAddress != address(0),
//             "Invalid patient ID: Patient to revoke access, does not exist."
//         );

//         // Find the address in the accessProvided list and remove it
//         bool addressFound = false;
//         for (uint i = 0; i < patient.accessProvided.length; i++) {
//             if (patient.accessProvided[i] == addressPatient.patientAddress) {
//                 // Remove the address by shifting the last element to the current position and reducing the array size
//                 patient.accessProvided[i] = patient.accessProvided[patient.accessProvided.length - 1];
//                 patient.accessProvided.pop();
//                 addressFound = true;
//                 break;
//             }
//         }

//         // If the address was not found in the list
//         require(addressFound, "Address not found in the access list.");

//         emit AccessRevoked(_patientID, addressPatient.patientAddress);
//     }


// }
