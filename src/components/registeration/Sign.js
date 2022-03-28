import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateCurrentUser } from '../../Redux/current_user';
import USER from '../../assets/images/user-icon.png';
import ADRESS from '../../assets/images/adress.png';
import PHOTO from '../../assets/images/photo-icon.png';
import CLOSE from '../../assets/images/close.png';
import './sign.css';

const Sign = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const navigate = useNavigate();
  let usernames = [];
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState(location.state.operation);
  try {
    usernames = usersData.users.map((user) => user.username);
  } catch {
    usernames = [];
  }
  const handleSignin = (event) => {
    event.preventDefault();
    const username = document.querySelector('.username').value;
    if (usernames.includes(username)) {
      const currentUser = usersData.users.filter((user) => user.username === username)[0];
      dispatch(updateCurrentUser(currentUser));
      dispatch({ type: 'LOGIN' });
      navigate('/', { state: { alert: 'signed in successfully!' } });
    } else {
      setMessage('Something went wrong!');
      const messagewrapper = document.querySelector('.alert');
      messagewrapper.style.display = 'flex';
    }
  };
  const adjustSize = () => {
    const signWrapper = document.querySelector('.sign-wrapper');
    const signWrapperIn = document.querySelector('.sign-wrapper-in');
    const otherUp = document.querySelector('.other-option-up');
    const signUp = document.querySelector('.sign-form-wrapper');
    const otherIn = document.querySelector('.other-option-in');
    const signIn = document.querySelector('.sign-form-wrapper-in');
    const signTitle = document.querySelector('.sign-title');
    const otherOptionTitle = document.querySelector('.other-option-title');
    const h = window.innerHeight;
    const w = window.innerWidth;
    if (w >= 1024) {
      if (signWrapper) {
        signWrapper.style.height = `${h}px`;
      }
      if (otherUp) {
        otherUp.style.height = `${h}px`;
      }
      if (signUp) {
        signUp.style.height = `${h}px`;
      }
      if (signWrapperIn) {
        signWrapperIn.style.height = `${h}px`;
      }
      if (otherIn) {
        otherIn.style.height = `${h}px`;
      }
      if (signIn) {
        signIn.style.height = `${h}px`;
      }
      if (otherOptionTitle) {
        otherOptionTitle.style.marginTop = `${0.3 * h}px`;
      }
    } else {
      if (signWrapperIn) {
        signWrapperIn.style.gridTemplateRows = `${0.65 * h}px ${0.35 * h}px`;
      }
      if (signWrapper) {
        signWrapper.style.gridTemplateRows = `${0.35 * h}px ${0.65 * h}px`;
      }
      signTitle.style.marginTop = `${0.1 * h}px`;
    }
  };
  const signChange = () => {
    if (operation === 'in') {
      setOperation('up');
    } else {
      setOperation('in');
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = document.querySelector('.username').value;
    const city = document.querySelector('.adress').value;
    const photo = document.querySelector('.photo').value;
    const user = { username, city, photo };
    const userUrl = 'https://agile-sands-67161.herokuapp.com/api/users';
    const messageUrl = 'https://agile-sands-67161.herokuapp.com/api/current_infos';
    await fetch(userUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const message = await fetch(messageUrl)
      .then((res) => res.json());
    const { statut, content } = message.message;
    console.log(statut);
    console.log(content);
    console.log(message);
  };
  const closeAlert = () => {
    const alert = document.querySelector('.alert');
    alert.style.display = 'none';
  };
  useEffect(() => adjustSize(), [operation]);
  return (
    <>
      { operation === 'up'
    && (
      <div className="sign-wrapper">
        <div className="other-option-up">
          <h1 className="other-option-title">Welcome Back!</h1>
          <p className="option-description">
            To keep connected with us please
            login with your personal info.
          </p>
          <button type="submit" onClick={signChange} className="switch-btn"> SIGN IN </button>
        </div>
        <div className="sign-form-wrapper">
          <h2 className="sign-title">Create Account</h2>
          <form>
            <div className="user-info">
              <div className="icon-data">
                <img src={USER} alt="user-icon" />
              </div>
              <input type="text" placeholder="USERNAME" className="input-data username" required />
            </div>
            <div className="user-info">
              <div className="icon-data">
                <img src={ADRESS} alt="adress-icon" />
              </div>
              <input type="text" placeholder="CITY" className="input-data adress" />
            </div>
            <div className="user-info">
              <div className="icon-data">
                <img src={PHOTO} alt="profile-icon" />
              </div>
              <input type="url" placeholder="PHOTO URL" className="input-data photo" />
            </div>
            <button type="submit" className="submit-btn" onClick={handleSignUp}>SIGN UP</button>
          </form>
        </div>
      </div>
    )}
      { operation === 'in'
  && (
  <div className="sign-wrapper-in">
    <div className="sign-form-wrapper-in">
      <div className="alert alert-danger " style={{ display: 'none', justifyContent: 'space-between' }}>
        <p>{message}</p>
        <div className="close-icon-wrapper" onClick={closeAlert} onKeyDown={closeAlert} aria-hidden="true">
          <img src={CLOSE} alt="close-icon" className="close-icon" />
        </div>
      </div>
      <h2 className="sign-title">Sign in to CARRENTAL</h2>
      <form>
        <div className="user-info">
          <div className="icon-data">
            <img src={USER} alt="user-icon" />
          </div>
          <input type="text" placeholder="USERNAME" className="input-data username" required />
        </div>
        <button type="submit" className="submit-btn" onClick={handleSignin}>SIGN IN</button>
      </form>
    </div>
    <div className="other-option-in">
      <h1 className="other-option-title">Hello, Friend!</h1>
      <p className="option-description">
        Enter your personal details and start journey with us.
      </p>
      <button type="submit" onClick={signChange} className="switch-btn"> SIGN UP </button>
    </div>
  </div>

  )}
    </>
  );
};
export default Sign;
