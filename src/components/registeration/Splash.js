import React, { useEffect, useRef, useState } from 'react';
import {
  useLocation, Link, useNavigate, NavLink,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Nav, Row, Modal,
} from 'react-bootstrap';
import { selectCar } from '../../Redux/SelectedCar/selectedCar';
import LOGO from '../../assets/images/logo.png';
import CLOSE from '../../assets/images/close.png';
import fetchAllCars from '../../Redux/cars/fetch/fetchcars';
import './splash.css';

const Splash = () => {
  const [lgShow, setLgShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  let alert = '';
  if (state) {
    alert = state.alert;
  }
  useEffect(() => dispatch(fetchAllCars()), []);
  const session = useSelector((state) => state.session);
  const carData = useSelector((state) => state.Cars);
  const currentUser = useSelector((state) => state.current_user);
  let cars = [];
  if (Object.keys(carData).includes('cars')) {
    cars = carData.cars;
  }
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
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
    let t = 30;
    if (w < 1024) {
      t = 15;
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
  const showItem = (e) => {
    let parent = e.target;
    while (parent.className !== 'car-item') {
      parent = parent.parentNode;
    }
    const selectedCar = cars.filter((car) => car.id === parseInt(parent.id, 10))[0];
    dispatch(selectCar(selectedCar));
    navigate('/Details');
  };

  const handleDelete = (carid) => {
    const url = `https://car-rentals-backend.fly.dev/api/cars/${carid}`;
    fetch(url, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) {
        navigate('/', { state: { alert: 'Car Deleted successfully!' } });
      } else {
        navigate('/', { state: { alert: 'Sorry, Car Could Not be Deleted' } });
      }
    });
    setLgShow(false);
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
     <div className="home-main">
       <div className="nav-wrapper">
         <div className="nav-logo-wrapper">
           <img src={LOGO} alt="logo" className="nav-logo-img" />
           <span className="nav-logo-text">CARRENTAL</span>
         </div>
         <div className="link-wrapper">
           <NavLink to="/" className="link-btn">All Cars</NavLink>
           <NavLink to="/Reserve" className="link-btn">Reserve</NavLink>
           <NavLink to="/Myreservations" className="link-btn">My Reservations</NavLink>
           <NavLink to="/NewCar" className="link-btn">Add a Car</NavLink>
           <Nav.Link onClick={() => setLgShow(true)} className="link-btn">Delete a Car</Nav.Link>
         </div>
         <Modal
           size="lg"
           show={lgShow}
           onHide={() => setLgShow(false)}
           aria-labelledby="example-modal-sizes-title-lg"
         >
           <Modal.Header closeButton>
             <Modal.Title id="example-modal-sizes-title-lg">
               Please Choose A Car To Delete
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             {cars.map((car) => (
               <li className="c-item" id={car.id} key={car.id} aria-hidden="true">
                 <div className="car-info">
                   <img className="car-image" src={car.photo_url} alt="car" width={50} height={50} />
                   <div className="c-brand-model">
                     <p className="car-brand">{car.brand}</p>
                     -
                     <p className="car-model">{car.model}</p>
                   </div>
                   <button className="delete-button btn btn-danger" disabled={currentUser.role !== 'admin'} type="button" onClick={() => handleDelete(car.id)}>Delete</button>
                 </div>
               </li>
             ))}
           </Modal.Body>
         </Modal>
       </div>
       <div className="cars-element">
         <div className="alert alert-success" style={{ display: alert === '' ? 'none' : 'flex', justifyContent: 'space-between' }}>
           <p>{alert}</p>
           <div className="close-icon-wrapper" onClick={closeAlert} onKeyDown={closeAlert} aria-hidden="true">
             <img src={CLOSE} alt="close-icon" className="close-icon" />
           </div>
         </div>
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
             <li className="car-item" id={car.id} key={car.id} onClick={(e) => showItem(e)} onKeyDown={(e) => showItem(e)} aria-hidden="true">
               <img className="car-image" src={car.photo_url} alt="car" width={180} height={180} />
               <div className="brand-model">
                 <p className="car-brand">{car.brand}</p>
                 &nbsp;
                 <p className="car-model">{car.model}</p>
               </div>
               <p className="model-year">{car.model_year}</p>
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
