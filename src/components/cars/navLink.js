import React from "react";
// import { NavLink } from 'react-router-dom';
import LOGO from "../../assets/images/logo.png";

const NavigationPanel = () => (
  <div>
    <div className="logo-wrapper">
      <img src={LOGO} alt="logo" className="logo-img" />
      <p className="logo-text">CARRENTAL</p>
    </div>
  </div>
);

export default NavigationPanel;
