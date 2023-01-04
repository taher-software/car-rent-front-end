import React from 'react';
import { NavLink } from 'react-router-dom';
import github from './images/github.png';
import linkedin from './images/‌linkedin.png';
import pinInterest from './images/Vectorthumb.png';
import twitter from './images/Vectortwitter.png';
import medium from './images/medium.png';

const Navbar = () => (
  <div>
    <button type="button" className="hamburger-btn bi bi-list">test</button>

    <div>
      <NavLink to="/" className="logo">car logo</NavLink>
      <div
      // bg="light"
        className="main-nav d-flex flex-column"
      >
        <NavLink to="/" className={(navData) => (navData.isActive ? 'active-link' : '')}>All Cars</NavLink>
        <NavLink to="/Reserve" className={(navData) => (navData.isActive ? 'active-link' : '')}>Reserve</NavLink>
        <NavLink to="/Myreservations" className={(navData) => (navData.isActive ? 'active-link' : '')}>My Reservations</NavLink>
        <NavLink to="/NewCar" className={(navData) => (navData.isActive ? 'active-link' : '')}>Add a Car</NavLink>
      </div>
      <ul className="d-flex social-icon">
        <li><img src={github} alt="github" /></li>
        <li><img src={linkedin} alt="linkedin" /></li>
        <li><img src={pinInterest} alt="peace" /></li>
        <li><img src={twitter} alt="twitter" /></li>
        <li><img src={medium} alt="medium" /></li>
      </ul>
    </div>
  </div>

);

export default Navbar;
