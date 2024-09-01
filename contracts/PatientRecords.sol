// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecords {
    struct Patient {
        uint patientID;
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
    event PatientsByInsuranceCompany(address insuranceCompanyAddress, uint[] patientIDs);

    constructor() {
        // Adding dummy records with valid checksummed addresses
        addPatient(
            1, 
            "John Doe", 
            30, 
            "Male", 
            "ABC Insurance", 
            0xb5B9e0F2AF4705064600397dED6C8D02f45fdbEA
        );
        
        addPatient(
            2, 
            "Alice Smith", 
            28, 
            "Female", 
            "XYZ Insurance", 
            0xf3d2Cc59DA667dB8cFeb1A2215605727C7ECfFE4
        );

        addPatient(
            3, 
            "David", 
            56, 
            "", 
            "XYZ Insurance", 
            0xf3d2Cc59DA667dB8cFeb1A2215605727C7ECfFE4
        );  

        addPatient(
            4, 
            "Bob Johnson", 
            45, 
            "Male", 
            "", 
            0x0000000000000000000000000000000000000000
        );
    }

    function addPatient(
        uint _patientID,
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _insuranceCompany,
        address _insuranceCompanyAddress
    ) public {
        patients[_patientID] = Patient(
            _patientID,
            bytes(_name).length > 0 ? _name : "",
            _age,
            bytes(_gender).length > 0 ? _gender : "",
            bytes(_insuranceCompany).length > 0 ? _insuranceCompany : "",
            _insuranceCompanyAddress
        );

        // Check if patientID already exists, if not, add to the array
        bool exists = false;
        for (uint i = 0; i < patientIDs.length; i++) {
            if (patientIDs[i] == _patientID) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            patientIDs.push(_patientID);
        }

        emit PatientAdded(_patientID, _name);
    }

    function getPatient(uint _patientID)
        public
        view
        returns (
            uint patientID,
            string memory name,
            uint age,
            string memory gender,
            string memory insuranceCompany,
            address insuranceCompanyAddress,
            string memory status
        )
    {
        Patient memory patient = patients[_patientID];
        
        // Allow access if no insurance company is associated
        if (patient.insuranceCompanyAddress == address(0)) {
            return (
                patient.patientID,
                patient.name,
                patient.age,
                patient.gender,
                patient.insuranceCompany,
                patient.insuranceCompanyAddress,
                "Access granted"
            );
        }

        // Check if the caller is the insurance company
        if (msg.sender != patient.insuranceCompanyAddress) {
            return (0, "", 0, "", "", address(0), "Unauthorized access");
        }

        return (
            patient.patientID,
            patient.name,
            patient.age,
            patient.gender,
            patient.insuranceCompany,
            patient.insuranceCompanyAddress,
            "Access granted"
        );
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
