import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Modal } from 'react-bootstrap';
import { DropdownDate } from 'react-dropdown-date';
import { NavLink, useNavigate } from 'react-router-dom';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';
import './NewReserve.css';

const DateFormatter = (d, numOfyear) => { // formats a JS date to 'yyyy-mm-dd'
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
  const currentUser = useSelector((state) => state.current_user);
  const currentCar = useSelector((state) => state.current_car);
  const [data, setData] = useState('');
  const loadData = async () => {
    const res = await fetch('https://warm-inlet-48309.herokuapp.com/api/cars');
    setData(await res.json());
  };
  useEffect(() => loadData(), []);
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
  const handleDelete = (carid) => {
    const url = `https://warm-inlet-48309.herokuapp.com/api/cars/${carid}`;
    fetch(url, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        navigate('/', { state: { alert: 'Car Deleted successfully!' } });
      } else {
        navigate('/', { state: { alert: 'Sorry, Car Could Not be Deleted' } });
      }
    });
    setLgShow(false);
  };
  if (!data) {
    return null;
  }
  return (
    <>
      <div
        className="d-flex reserve-contain"
      >
        <div className="nav-element">
          <Nav bg="light" className="main-nav flex-column">
            <NavLink to="/">All Cars</NavLink>
            <NavLink to="/Reserve">Reserve</NavLink>
            <NavLink to="/Myreservations">My Reservations</NavLink>
            <NavLink to="/NewCar">Add a Car</NavLink>
            <Nav.Link onClick={() => setLgShow(true)}>Delete a Car</Nav.Link>
          </Nav>
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
                    <button className="delete-button btn btn-danger" type="button" onClick={() => handleDelete(car.id)}>Delete</button>
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
          <div className="overLay" />
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
