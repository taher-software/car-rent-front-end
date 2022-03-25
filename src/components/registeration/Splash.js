import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Splash = () => {
  const { state } = useLocation();
  let alert = '';
  if (state) {
    alert = state.alert;
  }
  const session = useSelector((state) => state.session);
  console.log(alert);
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
   <div className="message-alert"><p>{alert}</p></div>
   )}
    </>
  );
};

export default Splash;
