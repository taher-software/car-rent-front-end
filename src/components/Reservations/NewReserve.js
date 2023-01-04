import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Modal } from 'react-bootstrap';
import { DropdownDate } from 'react-dropdown-date';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';
import { selectCar } from '../../Redux/SelectedCar/selectedCar';
import './NewReserve.css';
import LOGO from '../../assets/images/logo.png';

const DateFormatter = (d, numOfyear) => {
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear() + numOfyear}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

const formatDate = (date) => { // handles every date
  const d = new Date(date);
  return DateFormatter(d, 0);
};

const TodayDate = () => { // Handles todays date
  const d = new Date();
  return DateFormatter(d, 0);
};

const extendDate = (numOfYear) => {
  const d = new Date();
  return DateFormatter(d, numOfYear);
};

const cities = [
  {
    id: 1,
    name: 'Newyork',
  },
  {
    id: 2,
    name: 'lagos',
  },
  {
    id: 3,
    name: 'Paris',
  },
  {
    id: 4,
    name: 'Abidjan',
  },
  {
    id: 5,
    name: 'Moscow',
  },
];

const NewReservation = () => {
  const dispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('---Select City---');
  const [selectDate, setSelectedDate] = useState(TodayDate());
  const [Alertmessage, setAlertMessage] = useState('');
  const cars = useSelector((state) => state.Cars);
  const currentUser = useSelector((state) => state.current_user);
  const currentCar = useSelector((state) => state.current_car);
  const [data, setData] = useState('');
  const loadData = async () => {
    const res = await fetch('https://car-rentals-backend.fly.dev/api/cars');
    setData(await res.json());
  };
  useEffect(() => loadData(), []);
  const handleSubmit = async () => {
    if (selectedCity !== '---Select City---') {
      const reservation = {
        user_id: currentUser.id, car_id: currentCar.id, start_date: selectDate, city: selectedCity,
      };
      const reserveUrl = 'https://car-rentals-backend.fly.dev/api/reservations';
      const result = await fetch(reserveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      const message = await result.json();
      setAlertMessage(message);
      dispatch(fetchReserve());
    } else {
      setAlertMessage('Kindly select a city');
    }
  };
  const handleDelete = (carid) => {
    const url = `https://car-rentals-backend.fly.dev/api/cars/${carid}`;
    fetch(url, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) {
        navigate('/Reserve', { state: { alert: 'Car Deleted successfully!' } });
      } else {
        navigate('/Reserve', { state: { alert: 'Sorry, Car Could Not be Deleted' } });
      }
    });
    setLgShow(false);
  };

  const { id } = currentCar;
  const allCars = cars.cars;
  let index = 0;
  if (id) {
    index = allCars.findIndex((car) => car.id === id);
  }
  if (allCars !== undefined) {
    dispatch(selectCar(allCars[index]));
  }
  const moreHandler = () => {
    const l = allCars.length;
    let nextIndex = 0;
    if (index < l - 1) {
      nextIndex = index + 1;
    } else {
      nextIndex = 0;
    }
    const nextCar = allCars[nextIndex];
    dispatch(selectCar(nextCar));
  };

  if (!data) {
    return null;
  }
  return (
    <>
      <div
        className="d-flex reserve-contain"
      >
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
              {data.cars.map((car) => (
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
        <div
          className="new-reserve-container"
          style={{
            backgroundImage: `url(${currentCar.photo_url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="overLay position-absolute" />
          <h2 className="z-index1 reserve-brand position-absolute">{currentCar.brand}</h2>
          <div className="z-index1 d-flex flex-column change-reserve position-absolute">
            <p style={{ marginBottom: '5px', textAlign: 'center', marginRight: '25px' }}>More cars</p>
            <div className="d-flex align-items-center">
              <img src={currentCar.photo_url} alt={currentCar.brand} className="z-index1" style={{ width: '100px', height: '100px' }} />
              <span className="z-index1" onClick={moreHandler} aria-hidden="true">
                <FaChevronCircleRight style={{
                  width: '20px', height: '20px', color: '#fff', marginLeft: '10px', cursor: 'pointer',
                }}
                />
              </span>
            </div>
          </div>
          <h2 className="reserve-heading">Reserve a Car Today</h2>
          <p className="reserve-content">Our cars are available in all five major cities everyday, reserve a car today</p>
          <p className="alert-reserve">{Alertmessage}</p>
          <form>
            <div className="reserve-form">
              <div className="city-style">
                <select
                  id="cityId"
                  placeholder="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option>---Select City---</option>
                  {cities.map((city) => <option key={city.id}>{city.name}</option>)}
                </select>
              </div>
              <div className="date-style">
                <DropdownDate
                  startDate={
            // optional, if not provided 1900-01-01 is startDate
            TodayDate() // 'yyyy-mm-dd' format only
          }
                  endDate={
            // optional, if not provided current date is endDate
            extendDate(5) // 'yyyy-mm-dd' format only
          }
                  selectedDate={
            // optional
            selectDate // 'yyyy-mm-dd' format only
          }
                  onDateChange={(date) => {
                  // optional
                    setSelectedDate(formatDate(date));
                  }}
                />
              </div>
              <button type="button" onClick={handleSubmit}>Reserve</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewReservation;
