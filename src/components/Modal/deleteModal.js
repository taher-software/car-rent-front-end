import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const deleteModal = () => {
    const carsData = useSelector((state) => state.Cars);
    const [, setMessage] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async() => {
        const BASE_URL = "http://127.0.0.1:3000/";
        const res = await fetch(`${BASE_URL}/api/cars/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        await res.json();
        if (res.status === 200) {
            setMessage("Car deleted successfully");
        } else {
            setMessage("Some error occured");
        }
    };
    return ( <
        >
        <
        div className = "d-flex align-items-center justify-content-center"
        style = {
            { height: "100vh" } } >
        <
        Button variant = "primary"
        onClick = { handleShow } >
        Launch Form modal { " " } <
        /Button>{" "} <
        /div>{" "} <
        Modal show = { show } >
        <
        Modal.Header closeButton >
        <
        Modal.Title > Login Form < /Modal.Title>{" "} <
        /Modal.Header>{" "} <
        Modal.Body >
        <
        > < />{" "} <
        /Modal.Body>{" "} <
        Modal.Footer >
        <
        Button variant = "secondary" > Close Modal < /Button>{" "} <
        /Modal.Footer>{" "} <
        /Modal>{" "} <
        />
    );
};

export default deleteModal;