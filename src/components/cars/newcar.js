import React, { useState } from 'react';
import { Form, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddForm = () => {

    // const [userId, setUserId] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [photo_url, setPhoto_url] = useState('')
    const [description, setDescription] = useState('')
    const [rent_fee, setRent_fee] = useState('')
    const [reserved, setReserved] = useState('')
    const [likes_counter, setLikes_counter] = useState('')
    const [reservation_counter, setReservation_counter] = useState('')
    const [model_year, setModel_year] = useState('');


    let handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const car = {
                brand: brand,
                model: model,
                photoUrl: photo_url,
                rentFee: rent_fee,
                modelYear: model_year,
                reserved: reserved,
                likes_counter: likes_counter,
                reservation_counter: reservation_counter

            }
            let res = await fetch("http://127.0.0.1:3000/api/cars", {
                method: "POST",
                body: JSON.stringify(car),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setBrand("");
                setModel("");
                setPhoto_url("");
                setRent_fee("");
                setModel_fee("");
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };





    return ( <
        form onSubmit = { handleSubmit }
        className = "wrapper"
        style = {
            { margin: '5% 30% 20% 30%', boxShadow: '0 0 10px', padding: '5%' }
        } >

        <
        Form.Control placeholder = "Image"
        onChange = {
            (e) => setPhoto_url(e.target.value)
        }
        value = { photo_url }
        type = "text"
        alt = "image"
        id = "photo-url"
        className = "photo-url mt-3 mr-4 ml-4" /
        >
        <
        Form.Control placeholder = "Brand"
        onChange = {
            (e) => setBrand(e.target.value)
        }
        value = { brand }
        type = "text"
        id = "brand"
        className = "brand mt-3" /
        >
        <
        Form.Control placeholder = "Model year"
        onChange = {
            (e) => setModel_year(e.target.value)
        }
        value = { model_year }
        type = "number"
        id = "modelYear"
        className = "model-year mt-3" /
        >
        <
        Form.Control placeholder = "Decription"
        onChange = {
            (e) => setDescription(e.target.value)
        }
        value = { description }
        type = "text"
        id = "description"
        className = "description mt-3" /
        >
        <
        Form.Control placeholder = "Rent fee"
        onChange = {
            (e) => setRent_fee(e.target.value)
        }
        value = { rent_fee }
        type = "text"
        id = "rentFee"
        className = "rent-fee mt-3" /
        >
        <
        Form.Control placeholder = "Model"
        onChange = {
            (e) => setModel(e.target.value)
        }
        value = { model }
        type = "text"
        id = "model "
        className = "model mt-3" /
        >
        <
        Form.Control placeholder = "Reserved"
        onChange = {
            (e) => setReserved(e.target.value)
        }
        value = { reserved }
        type = "checkbox"
        id = "model "
        className = "reserved mt-3" /
        >
        <
        Form.Control placeholder = "Likes Counter"
        onChange = {
            (e) => setLikes_counter(e.target.value)
        }
        value = { likes_counter }
        type = "number"
        id = "likes_counter "
        className = "model mt-3" /
        >
        <
        Form.Control placeholder = "Reservation_counter"
        onChange = {
            (e) => setReservation_counter(e.target.value)
        }
        value = { reservation_counter }
        type = "number"
        id = "reservation_counter "
        className = "reservation_counter mt-3" /
        >
        <
        button type = "submit"
        className = "btn btn-success btn-lg mt-5"
        style = {
            { marginLeft: '35%' }
        } > { ' ' } { ' ' } { ' ' } { ' ' }
        submit { ' ' } { ' ' } { ' ' } { ' ' } { ' ' } { ' ' }

        <
        /button> { ' ' } { ' ' } { ' ' } { ' ' }

        <
        /form>
    );
};

AddForm.displayName = 'AddForm';

export default AddForm;