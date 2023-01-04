import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Form, Modal, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './newcar.css';
import './navLink.css';
import LOGO from '../../assets/images/logo.png';

const AddForm = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.current_user);

  const [brand, setBrand] = useState('');
  const [lgShow, setLgShow] = useState(false);
  const [model, setModel] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [rentFee, setRentFee] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const car = {
        brand,
        model,
        photo_url: photoUrl,
        rent_fee: rentFee,
        model_year: modelYear,
        description,
      };

      const res = await fetch('https://car-rentals-backend.fly.dev/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      await res.json();
      if (res.status === 200) {
        setBrand('');
        setModel('');
        setPhotoUrl('');
        setRentFee('');
        setModelYear('');
        setDescription('');
        setMessage('User created successfully');
        navigate('/');
      } else {
        setMessage('Some error occured');
      }
    } catch (err) {
      setMessage(err);
    }
  };
  const handleDelete = (carid) => {
    const url = `https://car-rentals-backend.fly.dev/api/cars/${carid}`;
    fetch(url, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) {
        navigate('/Newcar', { state: { alert: 'Car Deleted successfully!' } });
      } else {
        navigate('/Newcar', { state: { alert: 'Sorry, Car Could Not be Deleted' } });
      }
    });
    setLgShow(false);
  };
  const [data, setData] = useState('');
  const loadData = async () => {
    const res = await fetch('https://car-rentals-backend.fly.dev/api/cars');
    setData(await res.json());
  };
  useEffect(() => loadData(), []);

  if (!data) {
    return null;
  }
  return (
    <div className="newcar-page">
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
          <Nav.Link disabled={currentUser.role !== 'admin'} onClick={() => setLgShow(true)} className="link-btn">Delete a Car</Nav.Link>
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
                  <button className="delete-button btn btn-danger" type="button" onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
              </li>
            ))}
          </Modal.Body>
        </Modal>
      </div>
      <form
        onSubmit={handleSubmit}
        className="car-wrapper"
      >
        <h1>Add a New Car</h1>
        <Form.Control
          placeholder="Image"
          onChange={
            (e) => setPhotoUrl(e.target.value)
        }
          value={photoUrl}
          type="text"
          alt="image"
          id="photo-url"
          className="photo-url mt-3 mr-4 ml-4"
        />
        <Form.Control
          placeholder="Brand"
          onChange={
            (e) => setBrand(e.target.value)
        }
          value={brand}
          type="text"
          id="brand"
          className="brand mt-3"
        />
        <Form.Control
          placeholder="Model year"
          onChange={
            (e) => setModelYear(e.target.value)
        }
          value={modelYear}
          type="number"
          id="modelYear"
          className="car-model-year mt-3"
        />
        <Form.Control
          placeholder="Description"
          onChange={
            (e) => setDescription(e.target.value)
        }
          value={description}
          type="text"
          id="description"
          className="description mt-3"
        />
        <Form.Control
          placeholder="Rent fee"
          onChange={
            (e) => setRentFee(e.target.value)
        }
          value={rentFee}
          type="text"
          id="rentFee"
          className="rent-fee mt-3"
        />
        <Form.Control
          placeholder="Model"
          onChange={
            (e) => setModel(e.target.value)
        }
          value={model}
          type="text"
          id="model "
          className="model mt-3"
        />
        <button
          // button
          type="submit"
          className="btn btn-success btn-lg mt-5 car-btn"
          disabled={currentUser.role !== 'admin'}
        >
          Submit
          {' '}
          { ' ' }
        </button>
      </form>
    </div>
  );
};

AddForm.displayName = 'AddForm';

export default AddForm;
