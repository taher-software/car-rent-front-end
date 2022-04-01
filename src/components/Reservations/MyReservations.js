import React, { useEffect, useState } from 'react';
import { Nav, Table } from 'react-bootstrap';
import './MyReservations.css';
import { useSelector, useDispatch } from 'react-redux';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';

const MyReservations = () => {
  const [userid, Setuserid] = useState('');
  const [currentuserreservations, Setcurrentuserreservations] = useState('');
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchReserve()), []);
  const myreservations = useSelector((state) => state.my_reserves);
  const currentuser = useSelector((state) => state.current_user);
 
  Setuserid(currentuser.id);

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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>

        </div>
      </div>
    </div>
  );
};

export default MyReservations;
