import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownDate } from 'react-dropdown-date';
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
  const [selectedCity, setSelectedCity] = useState('---Select City---');
  const [selectDate, setSelectedDate] = useState(TodayDate());
  const [Alertmessage, setAlertMessage] = useState('');
  const currentUser = useSelector((state) => state.current_user);

  const handleSubmit = async () => {
    if (selectedCity !== '---Select City---') {
      const reservation = {
        user_id: currentUser.id, car_id: 1, start_date: selectDate, city: selectedCity,
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
    } else {
      setAlertMessage('Kindly select a city');
    }
  };
  useEffect(() => dispatch(fetchReserve()), []);
  return (
    <>
      <div className="new-reserve-container">
        <h1>MyReservations page</h1>
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
              <p className="alert-reserve">{Alertmessage}</p>
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
    </>
  );
};

export default NewReservation;
