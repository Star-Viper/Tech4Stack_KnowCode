// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Record {

   struct Patients {
    string ic;
    string name;
    string phone;
    string gender;
    string dob;
    string height;
    string weight;
    string houseaddr;
    string bloodgroup;
    string allergies;
    string medication;
    string emergencyName;
    string emergencyContact;
    address addr;
}


    struct Doctors {
    string ic;
    string name;
    string phone;
    string gender;
    string dob;
    string qualification;
    string major;
    address addr;
}


    struct Appointments {
    address doctoraddr;
    address patientaddr;
    string date;
    string time;
    string prescription;
    string description;
    string diagnosis;
    string status;
}


    address public owner;
    address[] public patientList;
    address[] public doctorList;
    address[] public appointmentList;

    mapping(address => Patients) public patients;
    mapping(address => Doctors) public doctors;
    mapping(address => Appointments) public appointments;

    mapping(address => mapping(address => bool)) public isApproved;
    mapping(address => bool) public isPatient;
    mapping(address => bool) public isDoctor;
    mapping(address => uint) public AppointmentPerPatient;

    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;

    constructor() {
        owner = msg.sender;
    }

    // Retrieve patient details from user sign up page and store the details into the blockchain
    function setDetails(Patients memory _details) public {
    require(!isPatient[msg.sender]);
    Patients storage p = patients[msg.sender];

    p.ic = _details.ic;
    p.name = _details.name;
    p.phone = _details.phone;
    p.gender = _details.gender;
    p.dob = _details.dob;
    p.height = _details.height;
    p.weight = _details.weight;
    p.houseaddr = _details.houseaddr;
    p.bloodgroup = _details.bloodgroup;
    p.allergies = _details.allergies;
    p.medication = _details.medication;
    p.emergencyName = _details.emergencyName;
    p.emergencyContact = _details.emergencyContact;
    p.addr = msg.sender;
    // p.date = block.timestamp;

    patientList.push(msg.sender);
    isPatient[msg.sender] = true;
    isApproved[msg.sender][msg.sender] = true;
    patientCount++;
}

function editDetails(Patients memory _details) public {
    require(isPatient[msg.sender]);
    Patients storage p = patients[msg.sender];

    p.ic = _details.ic;
    p.name = _details.name;
    p.phone = _details.phone;
    p.gender = _details.gender;
    p.dob = _details.dob;
    p.height = _details.height;
    p.weight = _details.weight;
    p.houseaddr = _details.houseaddr;
    p.bloodgroup = _details.bloodgroup;
    p.allergies = _details.allergies;
    p.medication = _details.medication;
    p.emergencyName = _details.emergencyName;
    p.emergencyContact = _details.emergencyContact;
    p.addr = msg.sender;
}


    // Retrieve patient details from doctor registration page and store the details into the blockchain
   function setDoctor(Doctors memory _details) public {
    require(!isDoctor[msg.sender]);
    Doctors storage d = doctors[msg.sender];

    d.ic = _details.ic;
    d.name = _details.name;
    d.phone = _details.phone;
    d.gender = _details.gender;
    d.dob = _details.dob;
    d.qualification = _details.qualification;
    d.major = _details.major;
    d.addr = msg.sender;
    // d.date = block.timestamp;

    doctorList.push(msg.sender);
    isDoctor[msg.sender] = true;
    doctorCount++;
}

function editDoctor(Doctors memory _details) public {
    require(isDoctor[msg.sender]);
    Doctors storage d = doctors[msg.sender];

    d.ic = _details.ic;
    d.name = _details.name;
    d.phone = _details.phone;
    d.gender = _details.gender;
    d.dob = _details.dob;
    d.qualification = _details.qualification;
    d.major = _details.major;
    d.addr = msg.sender;
}


    // Retrieve appointment details from appointment page and store the details into the blockchain
    function setAppointment(Appointments memory _details) public {
    require(isDoctor[msg.sender]);
    Appointments storage a = appointments[_details.patientaddr];

    a.doctoraddr = _details.doctoraddr;
    a.patientaddr = _details.patientaddr;
    a.date = _details.date;
    a.time = _details.time;
    a.diagnosis = _details.diagnosis;
    a.prescription = _details.prescription;
    a.description = _details.description;
    a.status = _details.status;
    // a.creationDate = block.timestamp;

    appointmentList.push(_details.patientaddr);
    appointmentCount++;
    AppointmentPerPatient[_details.patientaddr]++;
}

function updateAppointment(Appointments memory _details) public {
    require(isDoctor[msg.sender]);
    Appointments storage a = appointments[_details.patientaddr];

    a.doctoraddr = _details.doctoraddr;
    a.patientaddr = _details.patientaddr;
    a.date = _details.date;
    a.time = _details.time;
    a.diagnosis = _details.diagnosis;
    a.prescription = _details.prescription;
    a.description = _details.description;
    a.status = _details.status;
}


    // Owner of the record must give permission to the doctor only if they are allowed to view records
    function givePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = true;
        permissionGrantedCount++;
        return true;
    }

    // Owner of the record can take away the permission granted to doctors to view records
    function revokePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }

    // Retrieve a list of all patients' addresses
    function getPatients() public view returns(address[] memory) {
        return patientList;
    }

    // Retrieve a list of all doctors' addresses
    function getDoctors() public view returns(address[] memory) {
        return doctorList;
    }

    // Retrieve a list of all appointments' addresses
    function getAppointments() public view returns(address[] memory) {
        return appointmentList;
    }

    // Search patient details by entering a patient address (Only the record owner or a doctor with permission will be allowed to access)
    function searchPatientDemographic(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        require(isApproved[_address][msg.sender]);

        Patients storage p = patients[_address];

        return (p.ic, p.name, p.phone, p.gender, p.dob, p.height, p.weight);
    }

    // Search patient details by entering a patient address (Only the record owner or a doctor with permission will be allowed to access)
    function searchPatientMedical(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory) {
        require(isApproved[_address][msg.sender]);

        Patients storage p = patients[_address];

        return (p.houseaddr, p.bloodgroup, p.allergies, p.medication, p.emergencyName, p.emergencyContact);
    }

    // Search doctor details by entering a doctor address (Only the doctor will be allowed to access)
    function searchDoctor(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        require(isDoctor[_address]);

        Doctors storage d = doctors[_address];

        return (d.ic, d.name, d.phone, d.gender, d.dob, d.qualification, d.major);
    }

    // Search appointment details by entering a patient address
    function searchAppointment(address _address) public view returns(address, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        Appointments storage a = appointments[_address];
        Doctors storage d = doctors[a.doctoraddr];

        return (a.doctoraddr, d.name, a.date, a.time, a.diagnosis, a.prescription, a.description, a.status);
    }

    // Search patient record creation date by entering a patient address
    // function searchRecordDate(address _address) public view returns(uint) {
    //     Patients storage p = patients[_address];

    //     return (p.date);
    // }

    // Search doctor profile creation date by entering a patient address
    // function searchDoctorDate(address _address) public view returns(uint) {
    //     Doctors storage d = doctors[_address];

    //     return (d.date);
    // }

    // Search appointment creation date by entering a patient address
    // function searchAppointmentDate(address _address) public view returns(uint) {
    //     Appointments storage a = appointments[_address];

    //     return (a.creationDate);
    // }

    // Retrieve patient count
    function getPatientCount() public view returns(uint256) {
        return patientCount;
    }

    // Retrieve doctor count
    function getDoctorCount() public view returns(uint256) {
        return doctorCount;
    }

    // Retrieve appointment count
    function getAppointmentCount() public view returns(uint256) {
        return appointmentCount;
    }

    // Retrieve permission granted count
    function getPermissionGrantedCount() public view returns(uint256) {
        return permissionGrantedCount;
    }

    // Retrieve appointment count per patient
    function getAppointmentPerPatient(address _address) public view returns(uint256) {
        return AppointmentPerPatient[_address];
    }
}
