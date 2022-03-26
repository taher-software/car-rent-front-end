import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Sign from './components/registeration/Sign';
import Detail from './components/cars/detail';
import MyReservations from './components/Reservations/MyReservations';
import Reserve from './components/Reservations/reserve';
import NewCar from './components/cars/newcar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunkUser()), []);
  return (
    <div>
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
