import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Signin from './components/registeration/Signin';
import Signup from './components/registeration/Signup';
import Detail from './components/cars/detail';
import MyReservations from './components/Reservations/MyReservations';
import Reserve from './components/Reservations/reserve';
import NewCar from './components/cars/newcar';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  useEffect(() => dispatch(thunkUser()), []);

  return (
    <div>
      {!session
    && (
      <h1>Welcome</h1>
    )}
      {session
   && (
   <nav className="header navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
     <a className="navbar-brand" href="/#">
       <img src="Userimage" width="30" height="30" className="d-inline-block align-top" alt="..." />
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

   </nav>
   )}
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
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
