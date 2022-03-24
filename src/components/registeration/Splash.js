import React from 'react';
import { NavLink } from 'react-router-dom';

const Splash = () => (
  <section>
    <li>
      <NavLink to="/Signin">Sign in</NavLink>
    </li>
    <li>
      <NavLink to="/Signup">Sing up</NavLink>
    </li>
  </section>
);
export default Splash;
