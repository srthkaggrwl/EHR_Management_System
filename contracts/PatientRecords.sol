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
    event InsuranceCompanyUpdated(
        uint indexed patientID,
        address indexed oldInsuranceCompanyAddress,
        address indexed newInsuranceCompanyAddress,
        string cid // Updated CID
    );



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
            address[][] memory accessGrantedLists
        )
    {   
        uint length = patientIDs.length;

        // Create memory arrays for each patient property
        string[] memory _cids = new string[](length);
        address[][] memory _accessGrantedLists = new address[][](length);  // Array of arrays

        for (uint i = 0; i < length; i++) {
            uint patientID = patientIDs[i];
            Patient storage patient = patients[patientID];

            // Populate memory arrays with patient data
            _cids[i] = patient.cid;
            _accessGrantedLists[i] = patient.accessGranted;  // Store dynamic access list
        }
        
        // Return patient IDs, CIDs, and accessGranted lists
        return (
            patientIDs,
            _cids,
            _accessGrantedLists
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

    function grantAccess(uint _patientID, address _addressToGrant) public {
        // Get the patient record for the patient granting access
        Patient storage patient = patients[_patientID];

        // Only the patient can grant access
        // require(
        //     msg.sender == patient.patientAddress,
        //     "Unauthorized: Only the patient can grant access."
        // );
        
        // Check if the address to grant access is valid
        require(
            _addressToGrant != address(0),
            "Invalid address: Cannot grant access to a zero address."
        );

        // Check if the address is already in the accessGranted list
        bool alreadyHasAccess = false;
        for (uint i = 0; i < patient.accessGranted.length; i++){
            if (patient.accessGranted[i] == _addressToGrant){
                alreadyHasAccess = true;
                break;
            }
        }

        require(
            !alreadyHasAccess,
            "This address already has access."
        );

        // Add the new address to the accessGranted list
        patient.accessGranted.push(_addressToGrant);

        // Emit event for granted access
        emit AccessGranted(_patientID, _addressToGrant);
    }
  

    function revokeAccess(uint _patientID, address _addressToRevoke) public {
        // Get the patient record for the patient revoking access
        Patient storage patient = patients[_patientID];

        // Only the patient can revoke access
        // require(
        //     msg.sender == patient.patientAddress,
        //     "Unauthorized: Only the patient can revoke access."
        // );

        // Check if the address to revoke exists in the accessGranted list
        bool addressFound = false;
        for (uint i = 0; i < patient.accessGranted.length; i++) {
            if (patient.accessGranted[i] == _addressToRevoke) {
                // Remove the address by shifting the last element to the current position and reducing the array size
                patient.accessGranted[i] = patient.accessGranted[patient.accessGranted.length - 1];
                patient.accessGranted.pop();
                addressFound = true;
                break;
            }
        }

        // If the address was not found in the list
        require(addressFound, "Address not found in the access list.");

        // Emit an event for revoking access
        emit AccessRevoked(_patientID, _addressToRevoke);
    }

    function updateInsuranceCompany(
        uint _patientID,
        address _newInsuranceCompanyAddress,
        address _oldInsuranceCompanyAddress,
        string memory _cid // Pass CID as a parameter
    ) public {
        Patient storage patient = patients[_patientID];

        // Allow update only if the caller is the patient
        // require(
        //     msg.sender == patient.patientAddress,
        //     "Unauthorized: Only the patient can update this record."
        // );

        // Modify the accessGranted array to update the insurance company's access
        bool replaced = false;
        for (uint i = 0; i < patient.accessGranted.length; i++) {
            if (patient.accessGranted[i] == _oldInsuranceCompanyAddress) {
                patient.accessGranted[i] = _newInsuranceCompanyAddress; // Replace with new company address
                replaced = true;
                break;
            }
        }

        // If the old insurance company address was not found, add the new address
        if (!replaced) {
            patient.accessGranted.push(_newInsuranceCompanyAddress);
        }

        // Emit event to notify that the insurance company access details were updated
        emit InsuranceCompanyUpdated(
            _patientID,
            _oldInsuranceCompanyAddress,
            _newInsuranceCompanyAddress,
            _cid // Emit the updated CID for reference
        );
    }
}
    // function deleteInsuranceCompany(uint _patientID) public {
    //     Patient storage patient = patients[_patientID];

    //     // Allow deletion only if the caller is the patient
    //     require(
    //         msg.sender == patient.patientAddress,
    //         "Unauthorized: Only the patient can delete the insurance company."
    //     );

    //     string memory oldInsuranceCompany = patient.insuranceCompany;
    //     address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

    //     // Reset the insurance company details
    //     patient.insuranceCompany = "";
    //     patient.insuranceCompanyAddress = address(0);

    //     // Revoke access by removing the old insurance company address from the accessGranted array
    //     for (uint i = 0; i < patient.accessGranted.length; i++) {
    //         if (patient.accessGranted[i] == oldInsuranceCompanyAddress) {
    //             // Remove the address by shifting the elements in the array
    //             for (uint j = i; j < patient.accessGranted.length - 1; j++) {
    //                 patient.accessGranted[j] = patient.accessGranted[j + 1];
    //             }
    //             patient.accessGranted.pop(); // Reduce the array length
    //             break; // Exit the loop once the insurance company address is found and removed
    //         }
    //     }

    //     emit InsuranceCompanyDeleted(_patientID, oldInsuranceCompany, oldInsuranceCompanyAddress);
    // }

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
//             for (uint j = 0; j < patient.accessGranted.length; j++) {
//                 if (patient.accessGranted[j] == insuranceCompanyAddress) {
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
//             for (uint j = 0; j < patient.accessGranted.length; j++) {
//                 if (patient.accessGranted[j] == insuranceCompanyAddress) {
//                     ids[index] = patientIDs[i];
//                     patientsList[index] = patient;
//                     index++;
//                     break; // Break once the address is found
//                 }
//             }
//         }

//         return (ids, patientsList);
//     }

