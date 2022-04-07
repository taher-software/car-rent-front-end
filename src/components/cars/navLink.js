import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LOGO from '../../assets/images/logo.png';
import './navLink.css';

const NavigationPanel = (props) => {
  const { deleteHandler } = props;
  const currentUser = useSelector((state) => state.current_user);

  return (
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
        <button type="submit" disabled={currentUser.role !== 'admin'} onClick={deleteHandler} className="link-btn delete">Delete</button>
      </div>
    </div>
  );
};
NavigationPanel.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
};
export default NavigationPanel;
