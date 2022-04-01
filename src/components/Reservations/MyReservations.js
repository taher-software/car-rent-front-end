import React from 'react';
import { Nav } from 'react-bootstrap';
import './MyReservations.css';

const MyReservations = () => (
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
    </div>
  </div>
);

export default MyReservations;
