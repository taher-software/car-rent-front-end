import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import USER from '../../assets/images/user-icon.png';
import ADRESS from '../../assets/images/adress.png';
import PHOTO from '../../assets/images/photo-icon.png';
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
      dispatch({ type: 'LOGIN' });
      navigate('/', { state: { alert: 'signed in successfully!' } });
    } else {
      setMessage('Something went wrong!');
      const messagewrapper = document.querySelector('.alert-message');
      messagewrapper.style.display = 'block';
    }
  };
  const adjustSize = () => {
    const signWrapper = document.querySelector('.sign-wrapper');
    const otherUp = document.querySelector('.other-option-up');
    const signUp = document.querySelector('.sign-form-wrapper');
    const signTitle = document.querySelector('.sign-title');
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
    } else {
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
              <input type="text" placeholder="USERNAME" className="input-data" required />
            </div>
            <div className="user-info">
              <div className="icon-data">
                <img src={ADRESS} alt="adress-icon" />
              </div>
              <input type="text" placeholder="CITY" className="input-data" />
            </div>
            <div className="user-info">
              <div className="icon-data">
                <img src={PHOTO} alt="profile-icon" />
              </div>
              <input type="url" placeholder="PHOTO URL" className="input-data" />
            </div>
            <button type="submit" className="submit-btn">SIGN UP</button>
          </form>
        </div>
      </div>
    )}
      { operation === 'in'
  && (
  <div className="sign-wrapper">
    <div className="alert-message" style={{ display: 'none' }}>
      <p>{message}</p>
    </div>
    <div className="sign-form-wrapper">
      <h2 className="sign-title">Sign in to CARRENTAL</h2>
      <form>
        <div className="user-info">
          <div className="icon-data">
            <img src={USER} alt="user-icon" />
          </div>
          <input type="text" placeholder="USERNAME" className="input-data" required />
        </div>
        <button type="submit" className="submit-btn" onClick={handleSignin}>SIGN IN</button>
      </form>
    </div>
    <div className="other-option-up">
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
