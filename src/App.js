import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Sign from './components/registeration/Sign';
import Detail from './components/cars/detail';
import MyReservations from './components/Reservations/MyReservations';
import Reserve from './components/Reservations/reserve';
import NewCar from './components/cars/newcar';
import fetchAllCars from './Redux/cars/fetch/fetchcars';
import DOWN from './assets/images/down.png';
import LIST from './assets/images/liste.png';
import './app.css';

function App() {
  const dispatch = useDispatch();
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
    const signOut = document.querySelector('.sign-out-wrapper');
    if (!signOut) {
      const div = document.createElement('div');
      div.className = 'sign-out-wrapper';
      div.innerHTML = `<p class='sign-in-as'> Signed in as </p><p class='user-name'>${currentUser.username}</p><hr/><a href="/" class="sign-out">Sign out</a>`;
      const wrapper = document.querySelector('.wrapper-app');
      wrapper.appendChild(div);
      wrapper.zIndex = 1;
      div.zIndex = 999;
    }
    const leaveBtn = document.querySelector('.sign-out');
    leaveBtn.addEventListener('click', () => {
      localStorage.clear();
      dispatch({
        type: 'LOGOUT',
      });
    });
  };
  useEffect(() => dispatch(thunkUser()), []);
  useEffect(() => dispatch(fetchAllCars()), []);
  useEffect(() => adjustSize());
  return (
    <div className="wrapper-app">
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
        <img
          src={LIST}
          alt="menu-icon"
          className="menu-icon"
          width="10%"
          style={{
            border: '1px solid rgb(152, 191, 25)',
            height: '40px',
            marginLeft: '2.5%',
          }}
        />
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
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Details" element={<Detail />} />
          <Route path="/Myreservations" element={<MyReservations />} />
          <Route path="/Newcar" element={<NewCar />} />
          <Route path="/Reserve" element={<Reserve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
