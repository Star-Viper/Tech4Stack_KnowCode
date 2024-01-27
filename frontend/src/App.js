import { Route, Routes } from 'react-router-dom';

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
        <Route exact path='/showdoctor' element={<ShowDoctor />} />
        <Route exact path='/set-patient' element={<Setpatient />} />
        <Route exact path='/showpatient' element={<ShowPatient />} />
      </Routes>
    </>
  );
}

export default App;
