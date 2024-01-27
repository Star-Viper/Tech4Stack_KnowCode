import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Manufacturer from './components/Manufacturer';
import Setdoctor from './components/Setdoctor';
import ShowDoctor from './components/ShowDoctor';
import Setpatient from './components/Setpatient';
import ShowPatient from './components/Showpatient';
import Editdoctor from './components/Editdoctor';
import Editpatient from './components/Editpatient';

const Button = () => {
  return (
    <>
      <Link style={{float:'right',position:"fixed",bottom:"90px",right:"20px",backgroundColor:"rgba(200,200,200,0.4)",padding:"15px",borderRadius:"40px",textDecoration:"none",fontFamily:"sans-serif",color:"black"}} to="https://ml1-z16f.onrender.com/">For Minor Health Issues Try our AI Doctor</Link>
    </>
  )
}

function App() {
  
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register  />} />
        <Route exact path='/user' element={<User  />} />
        <Route exact path='/manufacturer' element={<Manufacturer  />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/set-doctor' element={<Setdoctor />} />
        <Route exact path='/edit-doctor' element={<Editdoctor />} />
        <Route exact path='/showdoctor' element={<ShowDoctor />} />
        <Route exact path='/set-patient' element={<Setpatient />} />
        <Route exact path='/edit-patient' element={<Editpatient />} />
        <Route exact path='/showpatient' element={<ShowPatient />} />
      </Routes>
      <Button/>
    </>
  );
}

export default App;
