import React, { useEffect } from 'react';
import {
  Route, Routes, Link, useLocation,
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
    <div className="splash-wrapper">
      <div className="app-presentation">
        <div className="logo-wrapper">
          {/* <img src={LOGO} alt="logo" className="logo-img" /> */}
          <p className="logo-text">CARRENTAL</p>
        </div>
        <div className="app-inf">
          <h1 className="app-name"> CAR RENTAL</h1>
          <hr />
          <p className="app-description">
            Welcome! Now you are thinking about a mean of transportation.
            Car rental is perhaps the best solution compared to all the other possibilities.
            High standards of mobility and safety are guaranteed.
            It makes you free from usage of public transport,
            and gives you power to ignore the weather conditions.
            Moreover, it is cheaper than taking a taxi.
            A rental car makes you free to explore all the country, its cities and towns.
            No matter whether you are travelling together as a family or company,
            for a holiday or business,you are welcome to choose any car from our collection.
            We offer weekly and monthly rates. Feel free to sign up to get the detailed information.
          </p>
        </div>
      </div>
      <div className="registration-links">
        <Link
          className="sign up"
          to="/Sign"
          state={{ operation: 'up' }}
        >
          SIGN UP
        </Link>
        <Link
          className="sign in"
          to="/Sign"
          state={{ operation: 'in' }}
        >
          LOG IN
        </Link>
      </div>
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
