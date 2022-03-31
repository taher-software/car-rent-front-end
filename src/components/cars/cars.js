import React, { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Cars = ({ cars }) => {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="cars-element">
      <h2>Our List Of Cars</h2>
      <h3>Please select a car to rent</h3>
      <Row className="scroll-btns">
        <Col>
          <button className="leftscrollbtn" type="button" onClick={() => scroll(-80)}>&lt;</button>
          <button className="rightscrollbtn" type="button" onClick={() => scroll(80)}>&gt;</button>
        </Col>
      </Row>
      <ul className="cars-list" ref={ref}>
        {cars.map((car) => (
          <li className="car-item" key={car.id}>
            <a href="/"><img className="car-image" src={car.photo_url} alt="car" width={180} height={180} /></a>
            <div className="brand-model">
              <p className="car-brand">{car.brand}</p>
              -
              <p className="car-model">{car.model}</p>
            </div>
            <p className="car-model-year">{car.model_year}</p>
          </li>
        ))}

      </ul>
    </div>
  );
};

Cars.propTypes = {
  cars: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Cars;
