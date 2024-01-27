require('dotenv').config()
const Patients = require('../models/Patients');
const Doctors = require('../models/Doctors');
const Appointments = require('../models/Appointment');

exports.setpatients = async (req, res)=> {
    const { name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, addr, report } = req.body;

    if (!name || !phone || !gender || !dob || !height || !weight || !houseaddr || !bloodgroup || !allergies || !medication || !addr || !report) {
        return res.status(422).json({error:"Please enter all the fields"})
    }
    try {
        const patients = new Patients({
            name, 
            phone, 
            gender, 
            dob, 
            height, 
            weight, 
            houseaddr, 
            bloodgroup, 
            allergies, 
            medication, 
            addr, 
            report
        })

        patients.save().then(async patients => {
            return res.json({
                message: "User Details added Successfully",
                patientId: patients._id.toString(),
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.setdoctors = async (req, res) => {
    const { license, name, phone, gender, dob, qualification, major, specialization, address} = req.body;

    if (!license || !name || !phone || !gender || !dob || !qualification || !major || !specialization || !address) {
        return res.status(422).json({ error: "Please enter all the fields" })
    }
    try {
        const doctors = new Doctors({
            license,
            name,
            phone,
            gender,
            dob,
            qualification,
            major,
            specialization,
            address
        })

        doctors.save().then(async doctors => {
            return res.json({
                message: "Doctor Details added Successfully",
                doctorId: doctors._id.toString(),
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.setappointments = async (req, res) => {
    const { address_patient, address_doctor, prescription, description, diagnosis, status, major} = req.body;

    if (!address_patient|| !address_doctor|| !prescription|| !description|| !diagnosis|| !status|| !major) {
        return res.status(422).json({ error: "Please enter all the fields" })
    }
    try {
        const appointments = new Appointments({
            address_patient, 
            address_doctor, 
            prescription, 
            description, 
            diagnosis, 
            status, 
            major
        })

        appointments.save().then(async appointments => {
            return res.json({
                message: "Appliaction set Successfully",
                appointmentId: appointments._id.toString(),
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.getpatients = async (req, res) => {
    try {
        const patientlist = await Patients.find({});
        return res.json(patientlist);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.getdoctors = async (req, res) => {
    try {
        const doctorlist = await Patients.find({});
        return res.json(doctorlist);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.getappointments = async (req, res) => {
    try {
        const appointmentlist = await Patients.find({});
        return res.json(appointmentlist);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}