import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import './newcar.css';

const AddForm = () => {
  const navigate = useNavigate();

  const [brand, setBrand] = useState('');
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
        photoUrl,
        rentFee,
        modelYear,
        description,
      };

      const res = await fetch('http://127.0.0.1:3000/api/cars', {
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
        setModel('');
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

  return (
    <form
      onSubmit={handleSubmit}
      className="car-wrapper"
    >
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
        button
        type="submit"
        className="btn btn-success btn-lg mt-5 car-btn"
      >
        Submit
        {' '}
      </button>
    </form>
  );
};

AddForm.displayName = 'AddForm';

export default AddForm;
