import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAuth } from '../store/auth';

export default function User() {
  const { state } = useAuth();
  const { contract } = state;
  const scannerRef = useRef();
  const [res, setRes] = useState("");

  useEffect(() => {
    const onScanSuccess = (decodedText, decodedResult) => {
      setRes(decodedText);
    };
    const scannerId = 'qrScanner';
    scannerRef.current.id = scannerId;

    const htmlScanner = new Html5QrcodeScanner(scannerId, { fps: 10, qrbos: 250 });
    htmlScanner.render(onScanSuccess);

    return () => {
      htmlScanner.clear();
    };
  }, []);


  const isFake = async () => {
    try {
      console.log(res);
      const [real, productInfo] = await contract.isReal(res);
      console.log(productInfo);
      if (real) {
        alert("Product is Real");
      } else {
        alert("Product is Fake");
      }
      // alert(`Product Info:\nID: ${productInfo.prd_id}\nName: ${productInfo.prd_name}\nBatch No: ${productInfo.batch_no}\nManufacturing Date: ${new Date(productInfo.manufacturingDate * 1000)}\nExpiration Date: ${new Date(productInfo.expirationDate * 1000)}`);
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };


  return (
    <>
      <Navbar />
      <div className="container">
        <div class="input-group mb-4">
          <input type="text" class="form-control" placeholder="Enter Product ID" aria-label="Recipient's username" aria-describedby="basic-addon2" value={res} onChange={(e) => setRes(e.target.value)} />
          <span class="input-group-text btn btn-outline-primary ms-2 fw-semibold" id="basic-addon2" onClick={isFake}>Detect</span>
        </div>
        <h4 className='text-center'>OR</h4>
        <div style={{ width: '400px', marginInline: "auto" }} ref={scannerRef}>
        </div>
        <div className='mt-5'>{res}</div>
      </div>

      <style>
        {`
          .container {
            height: 300px; /* Adjust height as needed */
            width: 600px; /* Adjust width as needed */
          }
        `}
      </style>
    </>
  );
}