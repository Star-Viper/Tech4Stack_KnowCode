import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Patient = () => {
    const { state , address , connectWallet } = useAuth();
    const { contract } = state;

    const navigate = useNavigate();
    useEffect(() => {
        connectWallet();
    }, [])

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [houseaddr, setHouseaddr] = useState("");
    const [bloodgroup, setBloodgroup] = useState("");
    const [allergies, setAllergies] = useState("");
    const [medication, setMedication] = useState("");


    const handleSubmit = async () => {
        try {
            const { contract, account } = state;
            const tx = await contract.setDetails(name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication);
            await tx.wait();
        } catch (error) {
            console.error('Error setting patient details:', error);
        }   
    }

  return (
      <>
          <Navbar/>
          <div className="container">
              <div className="form-body">
                  <form onSubmit={handleSubmit}>
                      <label for="address">Address:</label>
                      <input type="text" id="address" name="address" required value={address} />

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

                      <label>Houseaddr:</label>
                      <input type="text" value={houseaddr} onChange={(e) => setHouseaddr(e.target.value)} />

                      <label>Bloodgroup:</label>
                      <input type="text" value={bloodgroup} onChange={(e) => setBloodgroup(e.target.value)} />

                      <label>Medication:</label>
                      <input type="text" value={medication} onChange={(e) => setWeight(e.target.value)} />

                      <button type="submit">Set Ptient Details</button>
                  </form>
              </div >
          </div >
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
  )
}

export default Patient