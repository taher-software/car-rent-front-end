import React from 'react';
import { Nav } from 'react-bootstrap';

const MyReservations = () => (
  <div>
    <h1>MyReservations page</h1>
    <div className="nav-element">
      <Nav bg="light" className="main-nav flex-column">
        <Nav.Link href="/">All Cars</Nav.Link>
        <Nav.Link href="/Reserve">Reserve</Nav.Link>
        <Nav.Link href="/Myreservations">My Reservations</Nav.Link>
        <Nav.Link href="/NewCar">Add a Car</Nav.Link>
        <Nav.Link>Delete a Car</Nav.Link>
      </Nav>
    </div>
  </div>
);

export default MyReservations;
