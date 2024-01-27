import React from 'react'
import Navbar from './Navbar'
import logo from '../Images/Health Trace Logo.png';

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{display: "flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <img src={logo} style={{marginTop:"80px"}} />
      <h2 style={{textAlign: "center",marginTop:"60px"}}>"Discover a new era of healthcare with Health Trace, developed by Team Tech4Stack. We are revolutionizing health management by combining cutting-edge technology with a user-friendly experience. Explore the features that make Health Trace the ultimate choice for individuals and healthcare professionals."</h2>
      </div>
      
    </>
  )
}
