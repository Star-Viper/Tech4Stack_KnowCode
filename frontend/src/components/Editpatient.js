import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import Navbar from './Navbar';

const Editpatient = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();


    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [houseaddr, setHouseAddr] = useState('');
    const [bloodgroup, setBloodGroup] = useState('');
    const [allergies, setAllergies] = useState('');
    const [medication, setMedication] = useState('');
    const [p_address, setP_Address] = useState('');
    const [report, setReport] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/editpatient", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
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
                    address,
                    report
                })
            });

            if (response.status === 200) {
                // const res_data = await response.json();
                // console.log("response from server ", res_data);
                // storeTokenInLS(res_data.token);
                alert("Profile updated Successfully");
                navigate('/showpatient');
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
                        <label>Address:</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <label>Gender:</label>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />

                        <label>DOB:</label>
                        <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />

                        <label>Height:</label>
                        <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />

                        <label>Weight:</label>
                        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />

                        <label>House Address:</label>
                        <input type="text" value={houseaddr} onChange={(e) => setHouseAddr(e.target.value)} />

                        <label>Blood Group:</label>
                        <input type="text" value={bloodgroup} onChange={(e) => setBloodGroup(e.target.value)} />

                        <label>Allergies:</label>
                        <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} />

                        <label>Medication:</label>
                        <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} />

                        <button type='submit'>Set Patient Details</button>
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

export default Editpatient;
