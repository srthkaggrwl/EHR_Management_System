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
    }

    mapping(uint => Patient) public patients;
    uint[] public patientIDs;

    event PatientAdded(uint patientID, string name);
    event InsuranceCompanyUpdated(uint patientID, string oldInsuranceCompany, address oldInsuranceCompanyAddress, string newInsuranceCompany, address newInsuranceCompanyAddress);
    event InsuranceCompanyDeleted(uint patientID, string oldInsuranceCompany, address oldInsuranceCompanyAddress);

    function addPatient(
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _insuranceCompany,
        address _insuranceCompanyAddress
    ) public {
        uint newPatientID;

        // Determine the new patientID
        if (patientIDs.length > 0) {
            newPatientID = patientIDs[patientIDs.length - 1] + 1;
        } else {
            newPatientID = 1;
        }

        // Add new patient record
        patients[newPatientID] = Patient(
            newPatientID,
            msg.sender, // Automatically store the sender's address as the patient's address
            bytes(_name).length > 0 ? _name : "",
            _age,
            bytes(_gender).length > 0 ? _gender : "",
            bytes(_insuranceCompany).length > 0 ? _insuranceCompany : "",
            _insuranceCompanyAddress
        );

        // Add patientID to the list of IDs
        patientIDs.push(newPatientID);

        emit PatientAdded(newPatientID, _name);
    }

    function getPatientByAddress(address _patientAddress)
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

        // Find the patient by the provided address
        for (uint i = 0; i < length; i++) {
            if (patients[patientIDs[i]].patientAddress == _patientAddress) {
                patient = patients[patientIDs[i]];
                found = true;
                break;
            }
        }

        // Check if the patient was found
        if (!found) {
            return (0, address(0), "", 0, "", "", address(0), "Patient not found");
        }

        // Grant access if the caller is the patient or the insurance company
        if (msg.sender == patient.patientAddress || msg.sender == patient.insuranceCompanyAddress) {
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
            Patient[] memory patientList
        )
    {
        uint length = patientIDs.length;
        Patient[] memory allPatients = new Patient[](length);

        for (uint i = 0; i < length; i++) {
            uint patientID = patientIDs[i];
            allPatients[i] = patients[patientID];
        }

        return (patientIDs, allPatients);
    }

    function updateInsuranceCompany(
        uint _patientID,
        string memory _newInsuranceCompany,
        address _newInsuranceCompanyAddress
    ) public {
        Patient storage patient = patients[_patientID];

        // Allow update if the current insuranceCompanyAddress is either the caller or if it is the zero address (no insurance company)
        require(
            msg.sender == patient.insuranceCompanyAddress || patient.insuranceCompanyAddress == address(0),
            "Unauthorized: Only the current insurance company or an empty company can update this record."
        );

        string memory oldInsuranceCompany = patient.insuranceCompany;
        address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

        patient.insuranceCompany = _newInsuranceCompany;
        patient.insuranceCompanyAddress = _newInsuranceCompanyAddress;

        emit InsuranceCompanyUpdated(_patientID, oldInsuranceCompany, oldInsuranceCompanyAddress, _newInsuranceCompany, _newInsuranceCompanyAddress);
    }

    function deleteInsuranceCompany(uint _patientID) public {
        Patient storage patient = patients[_patientID];

        // Allow deletion if the current insuranceCompanyAddress is either the caller or if it is the zero address (no insurance company)
        require(
            msg.sender == patient.insuranceCompanyAddress || patient.insuranceCompanyAddress == address(0),
            "Unauthorized: Only the current insurance company or an empty company can delete this record."
        );

        string memory oldInsuranceCompany = patient.insuranceCompany;
        address oldInsuranceCompanyAddress = patient.insuranceCompanyAddress;

        patient.insuranceCompany = "";
        patient.insuranceCompanyAddress = address(0);

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

        // First, count how many patients have the given insurance company address
        for (uint i = 0; i < length; i++) {
            if (patients[patientIDs[i]].insuranceCompanyAddress == insuranceCompanyAddress) {
                count++;
            }
        }

        // Create arrays to hold the results
        uint[] memory ids = new uint[](count);
        Patient[] memory patientsList = new Patient[](count);

        uint index = 0;
        for (uint i = 0; i < length; i++) {
            if (patients[patientIDs[i]].insuranceCompanyAddress == insuranceCompanyAddress) {
                ids[index] = patientIDs[i];
                patientsList[index] = patients[patientIDs[i]];
                index++;
            }
        }

        return (ids, patientsList);
    }
}
