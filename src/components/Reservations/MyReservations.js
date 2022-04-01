import React, { useEffect, useState } from 'react';
import { Nav, Table } from 'react-bootstrap';
import './MyReservations.css';
import { useSelector, useDispatch } from 'react-redux';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';

const MyReservations = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const loadData = async () => {
    const res = await fetch('http://[::1]:3000/api/cars');
    setData(await res.json());
  };
  useEffect(() => loadData(), []);
  useEffect(() => dispatch(fetchReserve()), []);
  const myreservations = useSelector((state) => state.my_reserves);
  let reserves = [];
  if (Object.keys(myreservations).includes('reserves')) {
    reserves = myreservations.reserves;
  }
  const currentuser = useSelector((state) => state.current_user);
  const filteredreservations = reserves.filter((item) => item.user_id === currentuser.id);

  if (!data) {
    return null;
  }
  return (
    <div className="myreservations">
      <div className="nav-element">
        <Nav bg="light" className="main-nav flex-column">
          <Nav.Link href="/">All Cars</Nav.Link>
          <Nav.Link href="/Reserve">Reserve</Nav.Link>
          <Nav.Link href="/Myreservations">My Reservations</Nav.Link>
          <Nav.Link href="/NewCar">Add a Car</Nav.Link>
          <Nav.Link>Delete a Car</Nav.Link>
        </Nav>
      </div>
      <div className="myreserve-body">
        <h1 className="myreserve-title">My Reservations</h1>
        <div className="myreserve-table">
          <Table responsive="sm" striped bordered hover>
            <thead>
              <tr>
                <th id="reservation-id" className="table-header">Reservation ID</th>
                <th className="table-header">Car Brand</th>
                <th id="reserved-car-model" className="table-header">Car Model</th>
                <th className="table-header">Start Date</th>
                <th className="table-header">City</th>
              </tr>
            </thead>
            <tbody>
              { filteredreservations.map((reserve) => (
                <tr key={reserve.id}>
                  <td className="table-info">{reserve.id}</td>
                  <td className="table-info">
                    {(data.cars.filter((car) => car.id === reserve.id))[0].brand}
                  </td>
                  <td className="table-info">
                    {(data.cars.filter((car) => car.id === reserve.id))[0].model}
                  </td>
                  <td className="table-info">{reserve.start_date}</td>
                  <td className="table-info">{reserve.city}</td>
                </tr>
              ))}
            </tbody>

          </Table>

        </div>
      </div>
    </div>
  );
};

export default MyReservations;
