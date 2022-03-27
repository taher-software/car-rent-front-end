import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import fetchAllCars from '../../Redux/cars/fetch/fetchcars';

const Splash = () => {
  const { state } = useLocation();
  let alert = '';
  if (state) {
    alert = state.alert;
  }
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAllCars()), []);
  const session = useSelector((state) => state.session);
  const cars = useSelector((state) => state.Cars.cars);

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
     <div>
       <div className="message-alert"><p>{alert}</p></div>
       <div>
         {cars.map((car) => (
           <ul key={car.id}>
             <li>
               <p>{car.brand}</p>
               <p>{car.model}</p>
             </li>
           </ul>
         ))}
       </div>
     </div>
   )}
    </>
  );
};

export default Splash;
