import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
// import IconButton from '@mui/material/IconButton';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Signin from './components/registeration/Signin';
import Signup from './components/registeration/Signup';

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  useEffect(() => dispatch(thunkUser()), []);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <div>
      {!session
    && (
      <h1>Welcome</h1>
    )}
      {session
   && (
   <div>
     <nav className="header navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
       <a className="profile-photo navbar-brand" href="/#">
         <img src="Userimage" width="30" height="30" className="d-inline-block align-top" alt="." />
       </a>
       <Dropdown className="user-dropdown">
         Logged in as:
         <Dropdown.Toggle className="user-name-pro" variant="success" id="dropdown-basic">
           UserName
         </Dropdown.Toggle>
         <Dropdown.Menu>
           <Dropdown.Item href="#/action-1">Update Profile</Dropdown.Item>
           <Dropdown.Item href="#/action-2">Sign out</Dropdown.Item>
         </Dropdown.Menu>
       </Dropdown>
       <h3 className="dateandtime">{date}</h3>
     </nav>
   </div>
   )}
      <Router>
        <Splash />
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
