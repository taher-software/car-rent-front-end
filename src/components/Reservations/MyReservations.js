import React, { useEffect } from 'react';
import { Nav, Table } from 'react-bootstrap';
import './MyReservations.css';
import { useSelector, useDispatch } from 'react-redux';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';

const MyReservations = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchReserve()), []);
  const myreservations = useSelector((state) => state.my_reserves);
  let reserves = [];
  if (Object.keys(myreservations).includes('reserves')) {
    reserves = myreservations.reserves;
  }
  const currentuser = useSelector((state) => state.current_user);
  const filteredreservations = reserves.filter((item) => item.user_id === currentuser.id);

  console.log(filteredreservations);
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Car ID #</th>
                <th>Start Date</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              { filteredreservations.map((reserve) => (
                <tr key={reserve.id}>
                  <td>{reserve.id}</td>
                  <td>{reserve.car_id}</td>
                  <td>{reserve.start_date}</td>
                  <td>{reserve.city}</td>
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
