import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationPanel from './navLink';
import ARROW from '../../assets/images/arrow.png';
import './detail.css';
import ROTATE from '../../assets/images/rotate.png';
import BACK from '../../assets/images/back-green.png';
import PARAM from '../../assets/images/param.png';
import FORWARD from '../../assets/images/forward.png';

const Detail = () => {
  const item = useSelector((state) => state.current_car);
  const adjustSize = () => {
    const nav = document.querySelector('.nav-wrapper');
    const h = window.innerHeight;
    nav.style.height = `${h}px`;
  };
  const deletHandler = async () => {
    const carId = item.id;
    const url = `http://127.0.0.1:3002/api/cars/${carId}`;
    const retour = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(retour);
  };
  useEffect(() => adjustSize(), []);
  return (
    <div className="detail-wrapper">
      <NavigationPanel deleteHandler={deletHandler} />
      <div className="item-data-wrapper">
        <div className="datas-inf">
          <img src={item.photo_url} alt="item" className="item-img" />
          <div className="item-data">
            <h1 className="item-brand">
              {item.brand}
              {' '}
              {item.model}
            </h1>
            <span className="item-description">{item.description}</span>
            <div className="card-inf grey">
              <p className="title-data">Rent fee</p>
              <p className="value-data">
                {item.rent_fee}
                $
              </p>
            </div>
            <div className="card-inf">
              <p className="title-data">Likes</p>
              <p className="value-data">
                {item.likes_counter}
              </p>
            </div>
            <div className="card-inf grey">
              <p className="title-data">Model year</p>
              <p className="value-data">
                {item.model_year}
              </p>
            </div>
            <div className="card-inf">
              <p className="title-data">Reservation history number</p>
              <p className="value-data">
                {item.reservation_counter}
              </p>
            </div>
            <div className="more-model">
              <p className="more-text">Discover more Models</p>
              <img src={ARROW} alt="arrow-icon" className="arrow-icon" />
            </div>
          </div>
        </div>
        <div className="command-part">
          <Link to="/Reserve" className="reserve-btn">
            <img src={PARAM} className="btn-icons" alt="param-icon" />
            <p className="reserve-txt">Reserve</p>
            <img src={FORWARD} className="btn-icons" alt="forward-icon" />
          </Link>
          <img src={ROTATE} alt="rotate-icon" className="rotate-icon" />
          <img src={BACK} alt="back-icon" className="back-icon" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
