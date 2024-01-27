import React from 'react';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import qrCode from 'qrcode';
import { useAuth } from '../store/auth';

export default function Manufacturer() {
  const { state, address } = useAuth();
  const { contract } = state;
  const [manufactureDate, setManufactureDate] = useState("");
  const [productID, setProductID] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [prdName, setPrdName] = useState("");
  const [qrcode, setQRCode] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");

  function generateUniqueID() {
    return uuidv4();
  }
  const generateQRCode = async () => {
    const url = await qrCode.toDataURL(`http://localhost:${productID}`);
    setQRCode(url);
  };

  useEffect(() => {
    const initializeProductData = async () => {
      setProductID(generateUniqueID());
      setManufactureDate(getCurrentDate());
      await generateQRCode();
    };

    initializeProductData();
  }, []);



  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  function generateUniqueID() {
    return uuidv4();
  }


  function convertQRCodeToPNG(qrCodeUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = qrCodeUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob(blob => {
          resolve(new File([blob], 'qrcode.png', { type: 'image/png' }));
        }, 'image/png');
      };
      img.onerror = reject;
    });
  }


  const addProduct = async (e) => {
    e.preventDefault();
    if (qrCode) {
      try {

        const qrCodeUrl = await qrCode.toDataURL(productID);
        const qrCodePng = await convertQRCodeToPNG(qrCodeUrl);
        const formData = new FormData();
        formData.append('file', qrCodePng);
        const resFile = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
          method: "post",
          body: formData,
          headers: {
            pinata_api_key: "2116f8d5d3eda0bd29e1",
            pinata_secret_api_key: "1858c1b96394993389570925ad7bb82be08f04f21d0d31a8520cf9738200b8f7",
          },
        });

        const data = await resFile.json();

        const ImgHash = data.IpfsHash;
        console.log(ImgHash);
        const transaction = await contract.uploadProduct(prdName, prdName, batchNo, ImgHash);        
        await transaction.wait();
        alert("Product Added Successfully");
        setProductID(generateUniqueID());
        setBatchNo("");
        setPrdName("");
      } catch (error) {
        console.error("Error while adding product:", error);
        alert("Server Busy, Try Again Later");
      }

    }
    else {
      alert("QrCode not Generated yet")
    }
  };



  return (
    <>
      <Navbar />
      <div className='container'>
        <form onSubmit={addProduct}>
          <label htmlFor="product_id">Product ID:</label>
          <input type="text" id="product_id" name="product_id" required value={productID} />

          <label htmlFor="product_name">Product Name:</label>
          <input type="text" id="product_name" name="product_name" required value={prdName} onChange={(e) => setPrdName(e.target.value)} />

          <label htmlFor="batch_no">Batch Number:</label>
          <input type="text" id="batch_no" name="batch_no" required value={batchNo} onChange={(e) => setBatchNo(e.target.value)} />

          {qrcode && (
            <div className='m-1'>
              <label htmlFor='qrcode'>QR Code:</label>
              <div className='text-center'>
                <img src={qrcode} alt="" />
              </div>
            </div>
          )}


          <label htmlFor="manufacture_date">Manufacture Date:</label>
          <input type="date" id="manufacture_date" name="manufacture_date" required value={manufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)} />

          <input
            type="date"
            id="expiration_date"
            name="expiration_date"
            required
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />

          <button type="submit" className='submit'>Submit</button>
        </form>
      </div>
      <style>{`
      
      .container form {
        margin-inline:auto;
        width: 80%;
        max-width: 400px;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }
  
      input,
      textarea {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
  
      textarea {
        resize: vertical;
      }
  
      .submit{
        background-color: #0d6efd;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
      }
  
      button:hover {
        background-color: #45a049;
      }
      `}</style>
    </>
  );
}
