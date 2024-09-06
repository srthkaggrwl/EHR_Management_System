// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecords {
    struct Patient {
        uint patientID;
        address patientAddress;
        string name;
        uint age;
        string gender;
        string insuranceCompany;
        address insuranceCompanyAddress;
        address[] accessProvided;
    }

    mapping(uint => Patient) public patients;
    uint[] public patientIDs;

    event PatientAdded(uint patientID, string name);
    event InsuranceCompanyUpdated(uint patientID, string oldInsuranceCompany, address oldInsuranceCompanyAddress, string newInsuranceCompany, address newInsuranceCompanyAddress);
    event InsuranceCompanyDeleted(uint patientID, string oldInsuranceCompany, address oldInsuranceCompanyAddress);
    event AccessGranted(uint indexed patientID, address indexed newAddress);
    event AccessRevoked(uint patientID, address revokedAddress);


    function addPatient(
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _insuranceCompany,
        address _insuranceCompanyAddress
    ) public {

        uint newPatientID = patientIDs.length > 0 ? patientIDs[patientIDs.length - 1] + 1 : 1;
        
        Patient storage newPatient = patients[newPatientID];
        // Initialize the Patient fields
        newPatient.patientID = newPatientID;
        newPatient.patientAddress = msg.sender;
        newPatient.name = bytes(_name).length > 0 ? _name : "";
        newPatient.age = _age;
        newPatient.gender = bytes(_gender).length > 0 ? _gender : "";
        newPatient.insuranceCompany = bytes(_insuranceCompany).length > 0 ? _insuranceCompany : "";
        newPatient.insuranceCompanyAddress = _insuranceCompanyAddress;
       
        // Add addresses to the access_provided array in storage
        newPatient.accessProvided.push(msg.sender);
        newPatient.accessProvided.push(_insuranceCompanyAddress);

        // Add patientID to the list of IDs
        patientIDs.push(newPatientID);

        emit PatientAdded(newPatientID, _name);
    }

    function getPatientByID(uint _patientID)
        public
        view
        returns (
            uint patientID,
            address patientAddress,
            string memory name,
            uint age,
            string memory gender,
            string memory insuranceCompany,
            address insuranceCompanyAddress,
            string memory status
        )
    {
        uint length = patientIDs.length;

        // Check if there are no patient records
        if (length == 0) {
            return (0, address(0), "", 0, "", "", address(0), "No records found");
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
            return (0, address(0), "", 0, "", "", address(0), "Patient not found");
        }

        // Check if msg.sender is in the accessProvided array
        bool accessGranted = false;
        for (uint j = 0; j < patient.accessProvided.length; j++) {
            if (patient.accessProvided[j] == msg.sender) {
                accessGranted = true;
                break;
            }
        }

        // If access is granted, return the patient data
        if (accessGranted) {
            return (
                patient.patientID,
                patient.patientAddress,
                patient.name,
                patient.age,
                patient.gender,
                patient.insuranceCompany,
                patient.insuranceCompanyAddress,
                "Access granted"
            );
        } else {
            return (0, address(0), "", 0, "", "", address(0), "Unauthorized access");
        }
    }


    function getAllPatients()
        public
        view
        returns (
            uint[] memory patientIDsList,
            address[] memory patientAddresses,
            string[] memory names,
            uint[] memory ages,
            string[] memory genders,
            string[] memory insuranceCompanies,
            address[] memory insuranceCompanyAddresses,
            address[][] memory accessProvidedLists
        )
    {   
        uint length = patientIDs.length;

        // Create memory arrays for each patient property
        address[] memory _patientAddresses = new address[](length);
        string[] memory _names = new string[](length);
        uint[] memory _ages = new uint[](length);
        string[] memory _genders = new string[](length);
        string[] memory _insuranceCompanies = new string[](length);
        address[] memory _insuranceCompanyAddresses = new address[](length);
        address[][] memory _accessProvidedLists = new address[][](length);  // Array of arrays

        for (uint i = 0; i < length; i++) {
            uint patientID = patientIDs[i];
            Patient storage patient = patients[patientID];

            // Populate memory arrays with patient data
            _patientAddresses[i] = patient.patientAddress;
            _names[i] = patient.name;
            _ages[i] = patient.age;
            _genders[i] = patient.gender;
            _insuranceCompanies[i] = patient.insuranceCompany;
            _insuranceCompanyAddresses[i] = patient.insuranceCompanyAddress;
            _accessProvidedLists[i] = patient.accessProvided;  // Store dynamic access list
        }
        
        // Return all patient data including accessProvided array
        return (
            patientIDs,
            _patientAddresses,
            _names,
            _ages,
            _genders,
            _insuranceCompanies,
            _insuranceCompanyAddresses,
            _accessProvidedLists
        );
    }

    function updateInsuranceCompany(
        uint _patientID,
        string memory _newInsuranceCompany,
        address _newInsuranceCompanyAddress
    ) public {
        Patient storage patient = patients[_patientID];

        // Allow update only if the caller is the patient
        require(
            msg.sender == patient.patientAddress,
            "Unauthorized: Only the patient can update this record."
        );

        string memory oldInsuranceCompany = patient.insuranceCompany;
        address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

        // Update the insurance company details
        patient.insuranceCompany = _newInsuranceCompany;
        patient.insuranceCompanyAddress = _newInsuranceCompanyAddress;

        // Replace old insurance company address in the accessProvided array with the new address
        bool replaced = false;
        for (uint i = 0; i < patient.accessProvided.length; i++) {
            if (patient.accessProvided[i] == oldInsuranceCompanyAddress) {
                patient.accessProvided[i] = _newInsuranceCompanyAddress;
                replaced = true;
                break;
            }
        }

        // If the old insurance company address was not found in the array, add the new address
        if (!replaced) {
            patient.accessProvided.push(_newInsuranceCompanyAddress);
        }

        emit InsuranceCompanyUpdated(
            _patientID,
            oldInsuranceCompany,
            oldInsuranceCompanyAddress,
            _newInsuranceCompany,
            _newInsuranceCompanyAddress
        );
    }

    function deleteInsuranceCompany(uint _patientID) public {
        Patient storage patient = patients[_patientID];

        // Allow deletion only if the caller is the patient
        require(
            msg.sender == patient.patientAddress,
            "Unauthorized: Only the patient can delete the insurance company."
        );

        string memory oldInsuranceCompany = patient.insuranceCompany;
        address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

        // Reset the insurance company details
        patient.insuranceCompany = "";
        patient.insuranceCompanyAddress = address(0);

        // Revoke access by removing the old insurance company address from the accessProvided array
        for (uint i = 0; i < patient.accessProvided.length; i++) {
            if (patient.accessProvided[i] == oldInsuranceCompanyAddress) {
                // Remove the address by shifting the elements in the array
                for (uint j = i; j < patient.accessProvided.length - 1; j++) {
                    patient.accessProvided[j] = patient.accessProvided[j + 1];
                }
                patient.accessProvided.pop(); // Reduce the array length
                break; // Exit the loop once the insurance company address is found and removed
            }
        }

        emit InsuranceCompanyDeleted(_patientID, oldInsuranceCompany, oldInsuranceCompanyAddress);
    }

    function getPatientsByInsuranceCompany()
        public
        view
        returns (
            uint[] memory patientIDsList,
            Patient[] memory patientList
        )
    {
        address insuranceCompanyAddress = msg.sender;
        uint length = patientIDs.length;
        uint count = 0;

        // First, count how many patients have granted access to the caller (insurance company)
        for (uint i = 0; i < length; i++) {
            Patient memory patient = patients[patientIDs[i]];
            for (uint j = 0; j < patient.accessProvided.length; j++) {
                if (patient.accessProvided[j] == insuranceCompanyAddress) {
                    count++;
                    break; // Break once the address is found
                }
            }
        }

        // Create arrays to hold the results
        uint[] memory ids = new uint[](count);
        Patient[] memory patientsList = new Patient[](count);

        uint index = 0;
        for (uint i = 0; i < length; i++) {
            Patient memory patient = patients[patientIDs[i]];
            for (uint j = 0; j < patient.accessProvided.length; j++) {
                if (patient.accessProvided[j] == insuranceCompanyAddress) {
                    ids[index] = patientIDs[i];
                    patientsList[index] = patient;
                    index++;
                    break; // Break once the address is found
                }
            }
        }

        return (ids, patientsList);
    }

    function grantAccess(uint _patientID, uint _addressPatientID) public {
        // Get the patient record for the patient granting access
        Patient storage patient = patients[_patientID];
        
        // Get the patient record for the patient receiving access
        Patient storage addressPatient = patients[_addressPatientID];

        // Only the patient can grant access
        require(
            msg.sender == patient.patientAddress,
            "Unauthorized: Only the patient can grant access."
        );
        
        // Check if the addressPatientID exists
        require(
            addressPatient.patientAddress != address(0),
            "Invalid patient ID: Patient to grant access, does not exist."
        );

        // Check if the address is already in the accessProvided list
        bool alreadyHasAccess = false;
        for (uint i = 0; i < patient.accessProvided.length; i++) {
            if (patient.accessProvided[i] == addressPatient.patientAddress) {
                alreadyHasAccess = true;
                break;
            }
        }

        require(
            !alreadyHasAccess,
            "This address already has access."
        );

        // Add the new address to the accessProvided list
        patient.accessProvided.push(addressPatient.patientAddress);

        emit AccessGranted(_patientID, addressPatient.patientAddress);
    }


    function revokeAccess(uint _patientID, uint _addressPatientID) public {
        // Get the patient record for the patient revoking access
        Patient storage patient = patients[_patientID];

        // Get the patient record for the patient whose access is being revoked
        Patient storage addressPatient = patients[_addressPatientID];

        // Only the patient can revoke access
        require(
            msg.sender == patient.patientAddress,
            "Unauthorized: Only the patient can revoke access."
        );

        // Check if the addressPatientID exists
        require(
            addressPatient.patientAddress != address(0),
            "Invalid patient ID: Patient to revoke access, does not exist."
        );

        // Find the address in the accessProvided list and remove it
        bool addressFound = false;
        for (uint i = 0; i < patient.accessProvided.length; i++) {
            if (patient.accessProvided[i] == addressPatient.patientAddress) {
                // Remove the address by shifting the last element to the current position and reducing the array size
                patient.accessProvided[i] = patient.accessProvided[patient.accessProvided.length - 1];
                patient.accessProvided.pop();
                addressFound = true;
                break;
            }
        }

        // If the address was not found in the list
        require(addressFound, "Address not found in the access list.");

        emit AccessRevoked(_patientID, addressPatient.patientAddress);
    }


}
