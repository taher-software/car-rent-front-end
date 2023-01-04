import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NavigationPanel from './navLink';
import ARROW from '../../assets/images/arrow.png';
import './detail.css';
import ROTATE from '../../assets/images/rotate.png';
import BACK from '../../assets/images/back-green.png';
import PARAM from '../../assets/images/param.png';
import FORWARD from '../../assets/images/forward.png';
import CLOSE from '../../assets/images/close.png';
import LIKE from '../../assets/images/like.png';
import fetchAllCars from '../../Redux/cars/fetch/fetchcars';
import { selectCar } from '../../Redux/SelectedCar/selectedCar';
import thunkLikes from '../../Redux/Likes/Thunk/thunk';

const Detail = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');
  const item = useSelector((state) => state.current_car);
  const cars = useSelector((state) => state.Cars);
  const currentUser = useSelector((state) => state.current_user);
  const likesData = useSelector((state) => state.likes.likes);
  const [disable, setDisable] = useState(false);
  const adjustSize = () => {
    const nav = document.querySelector('.nav-wrapper');
    const h = window.innerHeight;
    nav.style.height = `${h}px`;
  };
  const navigate = useNavigate();
  const deletHandler = async () => {
    const carId = item.id;
    const url = `https://car-rentals-backend.fly.dev/api/cars/${carId}`;
    const retour = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    const status = retour.statusText;
    if (status === 'OK') {
      navigate('/', { state: { alert: 'Item deleted successfully.' } });
    } else {
      setInfo('Something went wrong!');
    }
  };
  const closeAlert = () => {
    const alert = document.querySelector('.alert');
    alert.style.display = 'none';
  };
  const rotateItem = () => {
    const item = document.querySelector('.item-img');
    item.style.transform += 'rotate(10deg)';
  };

  const addLike = async () => {
    const carId = item.id;
    const userId = currentUser.id;
    const likes = { user_id: userId, car_id: carId };
    const checkLike = likesData.filter((like) => like.user_id === userId && like.car_id === carId);
    const like = document.querySelector('.like-value');
    const likeNbr = parseInt(like.textContent, 10);
    setDisable(true);
    if (checkLike.length === 0) {
      like.textContent = likeNbr + 1;
    } else {
      like.textContent = likeNbr - 1;
    }
    const url = 'https://car-rentals-backend.fly.dev/api/likes';
    await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ likes }),
    });
    dispatch(thunkLikes());
    dispatch(fetchAllCars());
    setTimeout(() => setDisable(false), 1000);
  };
  const moreHandler = () => {
    const { id } = item;
    const allCars = cars.cars;
    const index = allCars.findIndex((car) => car.id === id);
    const l = allCars.length;
    let nextIndex = 0;
    if (index < l - 1) {
      nextIndex = index + 1;
    } else {
      nextIndex = 0;
    }
    const nextCar = allCars[nextIndex];
    dispatch(selectCar(nextCar));
  };
  useEffect(() => adjustSize(), []);
  return (
    <div className="detail-wrapper">
      <NavigationPanel deleteHandler={deletHandler} />
      <div className="item-data-wrapper">
        <div className="alert alert-success" style={{ display: info === '' ? 'none' : 'flex', justifyContent: 'space-between' }}>
          <p>{info}</p>
          <div className="close-icon-wrapper" onClick={closeAlert} onKeyDown={closeAlert} aria-hidden="true">
            <img src={CLOSE} alt="close-icon" className="close-icon" />
          </div>
        </div>
        <div className="datas-inf">
          <div className="item-img-wrapper">
            <img src={item.photo_url} alt="item" className="item-img" />
            <img src={LIKE} alt="like-icon" className="like-icon" onKeyDown={disable ? null : addLike} onClick={disable ? null : addLike} aria-hidden="true" />
          </div>
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
              <p className="value-data like-value">
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
              <img src={ARROW} alt="arrow-icon" className="arrow-icon" onClick={moreHandler} onKeyDown={moreHandler} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="command-part">
          <Link to="/Reserve" className="reserve-btn">
            <img src={PARAM} className="btn-icons" alt="param-icon" />
            <p className="reserve-txt">Reserve</p>
            <img src={FORWARD} className="btn-icons" alt="forward-icon" />
          </Link>
          <img src={ROTATE} alt="rotate-icon" className="rotate-icon" onClick={rotateItem} onKeyDown={rotateItem} aria-hidden="true" />
          <img src={BACK} alt="back-icon" className="back-icon" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
