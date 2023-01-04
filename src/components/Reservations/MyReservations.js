import React, { useEffect, useState } from 'react';
import { Nav, Table, Modal } from 'react-bootstrap';
import './MyReservations.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import fetchReserve from '../../Redux/Reserve/thunk/Fetch_reserve';
import LOGO from '../../assets/images/logo.png';

const MyReservations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [data, setData] = useState('');
  const loadData = async () => {
    const res = await fetch('https://car-rentals-backend.fly.dev/api/cars');
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

  const handleDelete = (carid) => {
    const url = `https://car-rentals-backend.fly.dev/api/cars/${carid}`;
    fetch(url, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) {
        navigate('/Myreservations', { state: { alert: 'Car Deleted successfully!' } });
      } else {
        navigate('/Myreservations', { state: { alert: 'Sorry, Car Could Not be Deleted' } });
      }
    });
    setLgShow(false);
  };

  if (!data) {
    return null;
  }
  return (
    <div className="myreservations">
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
                  <button className="delete-button btn btn-danger" disabled={currentuser.role !== 'admin'} type="button" onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
              </li>
            ))}
          </Modal.Body>
        </Modal>
      </div>
      <div className="myreserve-body">
        <h1 className="myreserve-title">My Reservations</h1>
        <div className="myreserve-table">
          <Table responsive="sm" striped bordered hover>
            <thead>
              <tr>
                <th id="reservation-id" className="table-header">ID #</th>
                <th className="table-header">Car Brand</th>
                <th id="reserved-car-model" className="table-header">Car Model</th>
                <th className="table-header">Start Date</th>
                <th className="table-header">Rent fee per Day</th>
                <th className="table-header">City</th>
              </tr>
            </thead>
            <tbody>
              { filteredreservations.map((reserve) => (
                <tr key={reserve.id}>
                  <td className="table-info">{reserve.id}</td>
                  <td className="table-info">
                    {(data.cars.filter((car) => car.id === reserve.car_id))[0].brand}
                  </td>
                  <td className="table-info">
                    {(data.cars.filter((car) => car.id === reserve.car_id))[0].model}
                  </td>
                  <td className="table-info">{reserve.start_date}</td>
                  <td className="table-info">
                    {(data.cars.filter((car) => car.id === reserve.car_id))[0].rent_fee}
                    {' '}
                    $
                  </td>
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
