import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ShowPatient = () => {
    const [patients, setPatients] = useState([]);

    const getDoctors = async () => {
        try {
            const response = await fetch("http://localhost:8000/getpatient", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setPatients(data);
            } else {
                window.alert("Server Busy, Try Again Later");
            }
        } catch (error) {
            console.error("Error fetching doctor details:", error);
            window.alert("Error fetching doctor details");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h1>Patients List</h1>
                {patients.map((ele) => (
                    <div key={ele.id}>
                        <h3>{ele.address}</h3>
                    </div>
                ))}
                {patients.length === 0 && <p>No doctors available.</p>}
            </div>
        </>
    );
};

export default ShowPatient;
