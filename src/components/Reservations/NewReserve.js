import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { DropdownDate } from 'react-dropdown-date';
import { FaChevronCircleRight } from 'react-icons/fa';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';
import { selectCar } from '../../Redux/SelectedCar/selectedCar';
import './NewReserve.css';

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
  const [selectedCity, setSelectedCity] = useState('---Select City---');
  const [selectDate, setSelectedDate] = useState(TodayDate());
  const [Alertmessage, setAlertMessage] = useState('');
  const cars = useSelector((state) => state.Cars);
  const currentUser = useSelector((state) => state.current_user);
  const currentCar = useSelector((state) => state.current_car);
  const handleSubmit = async () => {
    if (selectedCity !== '---Select City---') {
      const reservation = {
        user_id: currentUser.id, car_id: currentCar.id, start_date: selectDate, city: selectedCity,
      };
      const reserveUrl = 'https://warm-inlet-48309.herokuapp.com/api/reservations';
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

  return (
    <>
      <div
        className="d-flex reserve-contain"
      >
        <div className="nav-element">
          <Nav bg="light" className="main-nav flex-column">
            <Nav.Link href="/">All Cars</Nav.Link>
            <Nav.Link href="/Myreservations">My Reservations</Nav.Link>
            <Nav.Link href="/NewCar">Add a Car</Nav.Link>
            <Nav.Link>Delete a Car</Nav.Link>
          </Nav>
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
