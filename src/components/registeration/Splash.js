import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Nav, Row } from 'react-bootstrap';
import fetchAllCars from '../../Redux/cars/fetch/fetchcars';
import './splash.css';

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
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const menutoggle = () => {
    const x = document.querySelector('.main-nav');
    const y = document.querySelector('.hamburger-btn');
    if (x.style.display === 'flex') {
      x.style.display = 'none';
      y.style.color = 'black';
    } else {
      x.style.display = 'flex';
      y.style.color = 'white';
    }
  };
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
       <div className="nav-element">
         <div className="message-alert"><p>{alert}</p></div>
         <Nav bg="light" className="main-nav flex-column">
           <Nav.Link href="/">All Cars</Nav.Link>
           <Nav.Link href="/Reserve">Reserve</Nav.Link>
           <Nav.Link href="/Myreservations">My Reservations</Nav.Link>
           <Nav.Link href="/NewCar">Add a Car</Nav.Link>
           <Nav.Link>Delete a Car</Nav.Link>
         </Nav>
       </div>
       <IconButton type="button" onClick={menutoggle} onKeyDown={menutoggle} style={{ float: 'right' }}><i className="hamburger-btn bi bi-list" style={{ float: 'right', fontSize: '1.5rem' }} /></IconButton>
       <div className="cars-element">
         <h2>Our List Of Cars</h2>
         <h3>Please select a car to rent</h3>
         <Row className="scroll-btns">
           <Col>
             <button className="leftscrollbtn" type="button" onClick={() => scroll(-80)}>&lt;</button>
             <button className="rightscrollbtn" type="button" onClick={() => scroll(80)}>&gt;</button>
           </Col>
         </Row>
         <ul className="cars-list" ref={ref}>
           {cars.map((car) => (
             <li className="car-item" key={car.id}>
               <a href="/"><img className="car-image" src={car.photo_url} alt="car" width={180} height={180} /></a>
               <div className="brand-model">
                 <p className="car-brand">{car.brand}</p>
                 -
                 <p className="car-model">{car.model}</p>
               </div>
               <p>{car.model_year}</p>
             </li>
           ))}

         </ul>
       </div>
     </div>
   )}
    </>
  );
};

export default Splash;
