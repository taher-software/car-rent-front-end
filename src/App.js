import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import thunkUser from './Redux/Username/thunk/thunk';
import Splash from './components/registeration/Splash';
import Signin from './components/registeration/Signin';
import Signup from './components/registeration/Signup';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(thunkUser()), []);
  return (
    <div>
      <Router>
        <Splash />
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
