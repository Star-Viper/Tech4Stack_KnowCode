import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import Navbar from './Navbar';

const Setdoctor = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const [address, setAddress] = useState('');
    const [license, setLicense] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [qualification, setQualification] = useState('');
    const [major, setMajor] = useState('');
    const [specialization, setSpecialization] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://healthtrace.onrender.com/setdoctor", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    license,
                    name,
                    phone,
                    gender,
                    dob,
                    qualification,
                    major,
                    specialization,
                    address,
                })
            });

            if (response.status === 200) {
                // const res_data = await response.json();
                // console.log("response from server ", res_data);
                // storeTokenInLS(res_data.token);
                alert("Profile Stored Successfully");
                navigate('/showdoctor');
            } else {
                return alert("Invalid Credentials!!!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="form-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" required value={address} onChange={(e) => setAddress(e.target.value)} />

                        <label>License:</label>
                        <input type="text" value={license} onChange={(e) => setLicense(e.target.value)} />

                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <label>Gender:</label>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />

                        <label>DOB:</label>
                        <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />

                        <label>Qualification:</label>
                        <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} />

                        <label>Major:</label>
                        <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />

                        <label>Specialization:</label>
                        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />

                        <button type="submit">Set Doctor Details</button>
                    </form>
                </div>
            </div>
            <style>{`
                .container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 100%;
        max-width: 400px;
      }
      
      .form-header {
        background-color: #4CAF50;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      
      .form-body {
        padding: 20px;
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      input {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 5px;
      }
      
      button {
        background-color: #0d6efd;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      button:hover {
        background-color: #45a049;
      }
            `}</style>
        </>
    );
};

export default Setdoctor;
