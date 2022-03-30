import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Sign from './components/registeration/Sign';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunkUser()), []);
  return (
    <div>
      <Router>
        <Splash />
        <Routes>
          <Route path="/Sign" element={<Sign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
