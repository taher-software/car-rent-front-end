import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Sign from './components/registeration/Sign';
import Detail from './components/cars/detail';
import MyReservations from './components/Reservations/MyReservations';
import NewReservation from './components/Reservations/NewReserve';
import NewCar from './components/cars/newcar';
import fetchAllCars from './Redux/cars/fetch/fetchcars';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunkUser()), []);
  useEffect(() => dispatch(fetchAllCars()), []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Details" element={<Detail />} />
          <Route path="/Myreservations" element={<MyReservations />} />
          <Route path="/Newcar" element={<NewCar />} />
          <Route path="/Reserve" element={<NewReservation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
