import {
  BrowserRouter as Router, NavLink, Route, Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import thunkLikes from './Redux/Likes/Thunk/thunk';
import Splash from './components/registeration/Splash';
import Sign from './components/registeration/Sign';
import Detail from './components/cars/detail';
import MyReservations from './components/Reservations/MyReservations';
import NewReservation from './components/Reservations/NewReserve';
import NewCar from './components/cars/newcar';
import fetchAllCars from './Redux/cars/fetch/fetchcars';
import fetchReserve from './Redux/Reserve/thunk/Fetch_reserve';
import DOWN from './assets/images/down.png';
import './app.css';

const App = () => {
  const dispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);
  const session = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.current_user);
  let userPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYOyr5Ec8JLXH9PnLVHZ2QKcW43XQs47vnQ&usqp=CAU';
  if (currentUser.photo) {
    userPhoto = currentUser.photo;
  }
  const adjustSize = () => {
    const header = document.querySelector('.header');
    const menu = document.querySelector('.menu-icon');
    const profile = document.querySelector('.profile-icon');
    const w = window.innerWidth;
    if (w >= 1024) {
      header.style.padding = '1.25% 0';
      menu.style.display = 'none';
      header.style.justifyContent = 'flex-end';
      profile.style.width = '4%';
    }
  };
  const profileMenu = (e) => {
    let { target } = e;
    while (target.className !== 'profile-icon') {
      target = target.parentNode;
    }
    let signOut = document.querySelector('.sign-out-wrapper');
    if (!signOut) {
      const div = document.createElement('div');
      div.className = 'sign-out-wrapper';
      div.innerHTML = `<p class='sign-in-as'> Signed in as </p><p class='user-name'>${currentUser.username}</p><hr/><a href="/" class="sign-out">Sign out</a>`;
      const wrapper = document.querySelector('.wrapper-app');
      wrapper.appendChild(div);
      wrapper.zIndex = 1;
      div.zIndex = 999;
    }
    signOut = document.querySelector('.sign-out-wrapper');
    signOut.style.display = 'flex';
    const leaveBtn = document.querySelector('.sign-out');
    leaveBtn.addEventListener('click', () => {
      localStorage.clear();
      dispatch({
        type: 'LOGOUT',
      });
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('.profile-icon')) {
        return;
      }
      if (e.target.closest('.sign-out-wrapper')) {
        return;
      }
      signOut.style.display = 'none';
    });
  };
  const handleDelete = (carid) => {
    const url = `https://car-rentals-backend.fly.dev/api/cars/${carid}`;
    fetch(url, { method: 'DELETE' }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
    setLgShow(false);
  };
  const carData = useSelector((state) => state.Cars);
  let cars = [];
  if (Object.keys(carData).includes('cars')) {
    cars = carData.cars;
  }
  useEffect(() => dispatch(fetchReserve()), []);
  useEffect(() => dispatch(thunkUser()), []);
  useEffect(() => dispatch(fetchAllCars()), []);
  useEffect(() => adjustSize(), []);
  useEffect(() => dispatch(thunkLikes()), []);
  return (
    <div className="wrapper-app">
      <Router>
        <header
          className="header"
          style={{
            display: session ? 'flex' : 'none',
            backgroundColor: 'rgb(152, 191, 25)',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5% 0',
          }}
        >

          <div className="dropdown menu-icon">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown button
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
              <li><NavLink className="dropdown-item active" to="/">All Cars</NavLink></li>
              <li><NavLink className="dropdown-item" to="/Reserve">Reserve</NavLink></li>
              <li><NavLink className="dropdown-item" to="/Myreservations">My Reservations</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/NewCar">Add a Car</NavLink></li>
              <li><Nav.Link disabled={currentUser.role !== 'admin'} className="dropdown-item" onClick={() => setLgShow(true)}>Delete a Car</Nav.Link></li>
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
                  {cars.map((car) => (
                    <li className="c-item" id={car.id} key={car.id} aria-hidden="true">
                      <div className="car-info">
                        <img className="car-image-mobile" src={car.photo_url} alt="car" width={50} height={50} />
                        <div className="c-brand-model">
                          <p className="car-brand-mobile">{car.brand}</p>
                          -
                          <p className="car-model-mobile">{car.model}</p>
                        </div>
                        <button className="delete-button btn btn-danger" type="button" onClick={() => handleDelete(car.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
                </Modal.Body>
              </Modal>
            </ul>
          </div>
          <div
            className="profile-icon"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '2.5%',
              width: '10%',
            }}
            onClick={profileMenu}
            onKeyDown={profileMenu}
            aria-hidden="true"
          >
            <img
              src={userPhoto}
              className="user-photo"
              alt="profile"
              width="75%"
              style={{
                border: '1px solid rgb(152, 191, 25)',
                borderRadius: '50%',
                height: '32px',
              }}
            />
            <img src={DOWN} className="down-option" alt="account-option" width="25%" height="8px" />
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Details" element={<Detail />} />
          <Route path="/Myreservations" element={<MyReservations />} />
          <Route path="/Newcar" element={<NewCar />} />
          <Route path="/Reserve" element={<NewReservation />} />
          <Route path="/Detail" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
