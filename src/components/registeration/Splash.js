import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LOGO from '../../assets/images/logo.png';
import CLOSE from '../../assets/images/close.png';
import './splash.css';

const Splash = () => {
  const { state } = useLocation();
  let alert = '';
  if (state) {
    alert = state.alert;
  }
  const session = useSelector((state) => state.session);
  const adjustSize = () => {
    const h = window.innerHeight;
    const w = window.innerWidth;
    const splash = document.querySelector('.splash-wrapper');
    if (splash) {
      splash.style.height = `${h}px`;

      if (w < 1024) {
        const logo = document.querySelector('.logo-wrapper');
        logo.style.top = `${0.3 * h}px`;
        const registration = document.querySelector('.registration-links');
        registration.style.top = `${0.575 * h}px`;
      } else {
        const presentation = document.querySelector('.app-presentation');
        presentation.style.height = `${0.8 * h}px`;
        presentation.style.paddingTop = `${0.1 * h}px`;
      }
    }
  };

  const animation = () => {
    const w = window.innerWidth;
    let t = 50;
    if (w < 1024) {
      t = 25;
    }
    const forward = (t) => {
      const object = document.querySelector('.logo-img');
      if (object) {
        object.style.transform += `translateY(${t}px)`;
      }
    };
    const backward = (t) => {
      const object = document.querySelector('.logo-img');
      if (object) {
        object.style.transform += `translateY(${-t}px)`;
      }
    };
    forward(t);
    setTimeout(backward, 1000, t);
  };
  const closeAlert = () => {
    const alert = document.querySelector('.alert');
    alert.style.display = 'none';
  };
  useEffect(() => adjustSize(), []);
  useEffect(() => setInterval(animation, 2000));
  return (
    <>
      {!session
    && (
    <div className="splash-wrapper">
      <div className="app-presentation">
        <div className="logo-wrapper">
          <img src={LOGO} alt="logo" className="logo-img" />
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
   <div className="alert alert-success" style={{ display: alert === '' ? 'none' : 'flex', justifyContent: 'space-between' }}>
     <p>{alert}</p>
     <div className="close-icon-wrapper" onClick={closeAlert} onKeyDown={closeAlert} aria-hidden="true">
       <img src={CLOSE} alt="close-icon" className="close-icon" />
     </div>
   </div>
   )}
    </>
  );
};

export default Splash;
