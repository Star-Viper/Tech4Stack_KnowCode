import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ShowDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {
        try {
            const response = await fetch("https://healthtrace.onrender.com/getdoctor", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setDoctors(data);
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
            <Navbar/>
        <div>
                <h1>Doctor List</h1>
            {doctors.map((ele) => (
                <div key={ele.id}>
                    <h3>{ele.address}</h3>
                </div>
            ))}
            {doctors.length === 0 && <p>No doctors available.</p>}
            </div>
        </>
    );
};

export default ShowDoctor;
