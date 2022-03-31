import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavigationPanel from './navLink';
import ARROW from '../../assets/images/arrow.png';
import './detail.css';

const Detail = () => {
  const item = useSelector((state) => state.current_car);
  console.log(item);
  const adjustSize = () => {
    const nav = document.querySelector('.nav-wrapper');
    const h = window.innerHeight;
    nav.style.height = `${h}px`;
  };
  useEffect(() => adjustSize(), []);
  return (
    <div className="detail-wrapper">
      <NavigationPanel />
      <div className="item-data-wrapper">
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
    </div>
  );
};

export default Detail;
