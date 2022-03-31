import React from 'react';
import { NavLink } from 'react-router-dom';
import LOGO from '../../assets/images/logo.png';
import './navLink.css';

const NavigationPanel = () => (
  <div className="nav-wrapper">
    <div className="nav-logo-wrapper">
      <img src={LOGO} alt="logo" className="nav-logo-img" />
      <span className="nav-logo-text">CARRENTAL</span>
    </div>
    <div className="link-wrapper">
      <NavLink to="/" className="link-btn">All Cars</NavLink>
      <NavLink to="/Reserve" className="link-btn">Reserve</NavLink>
      <NavLink to="/Myreservations" className="link-btn">My Reservations</NavLink>
      <NavLink to="/Newcar" className="link-btn">Add a Car</NavLink>
      <NavLink to="/" className="link-btn">Delete</NavLink>
    </div>
  </div>
);

export default NavigationPanel;
