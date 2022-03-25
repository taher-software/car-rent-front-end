import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.Users);
  const navigate = useNavigate();
  let usernames = [];
  const [message, setMessage] = useState('');
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

  return (
    <section>
      <div className="alert-message" style={{ display: 'none' }}>
        <p>{message}</p>
      </div>
      <form>

        Username:
        <input className="username" type="text" name="username" />

        <input type="submit" value="Log in" onClick={handleSignin} />
      </form>
    </section>
  );
};
export default Signin;
