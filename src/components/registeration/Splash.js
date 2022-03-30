import React, { useEffect } from 'react';
import {
  Route, Routes, NavLink, useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import fetchAllCars from '../../Redux/cars/fetch/fetchcars';
import Navbar from '../Navbar/Navbar';
// import MobileHambuger from '../Navbar/mobile';
import Cars from '../cars/cars';
import Detail from '../cars/detail';
import MyReservations from '../Reservations/MyReservations';
import NewReservation from '../Reservations/NewReserve';
import NewCar from '../cars/newcar';
import './splash.css';

const Splash = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAllCars()), []);
  const cars = useSelector((state) => state.Cars.cars);
  const { state } = useLocation();
  let alert = '';
  if (state) {
    alert = state.alert;
  }

  const session = useSelector((state) => state.session);

  return (
    <>
      {!session
    && (
    <div className="registration-links">
      <li>
        <NavLink to="/Signin">Sign in</NavLink>
      </li>
      <li>
        <NavLink to="/Signup">Sing up</NavLink>
      </li>
    </div>
    )}
      {session
   && (
     <div className="home-main">
       <div className="nav-element flex-column justify-content-between">
         <div className="message-alert"><p>{alert}</p></div>
         <Navbar />
       </div>
       <Routes>
         <Route path="/" element={<Cars cars={cars} />} />
         <Route path="/Details" element={<Detail />} />
         <Route path="/Myreservations" element={<MyReservations />} />
         <Route path="/Newcar" element={<NewCar />} />
         <Route path="/Reserve" element={<NewReservation />} />
       </Routes>
     </div>
   )}
    </>
  );
};

export default Splash;
