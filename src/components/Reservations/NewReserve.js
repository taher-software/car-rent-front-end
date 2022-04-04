import React, { useState } from "react";
import { DropdownDate } from "react-dropdown-date";
import "./NewReserve.css";

const DateFormatter = (d, numOfyear) => {
  // formats a JS date to 'yyyy-mm-dd'
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear() + numOfyear}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
};

const formatDate = (date) => {
  // handles every date
  const d = new Date(date);
  return DateFormatter(d, 0);
};

const TodayDate = () => {
  // Handles todays date
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
    name: "Newyork",
  },
  {
    id: 2,
    name: "lagos",
  },
  {
    id: 3,
    name: "Paris",
  },
  {
    id: 4,
    name: "Abidjan",
  },
  {
    id: 5,
    name: "Moscow",
  },
];

const NewReservation = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectDate, setSelectedDate] = useState(TodayDate());

  return (
    <>
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
              {cities.map((city) => (
                <option key={city.id}>{city.name}</option>
              ))}
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
                console.log(date);
                setSelectedDate(formatDate(date));
              }}
            />
          </div>
          <button type="button">Reserve</button>
        </div>
      </form>
    </>
  );
};

export default NewReservation;
