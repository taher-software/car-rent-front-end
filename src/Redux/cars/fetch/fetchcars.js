import { loadCars, failCars } from '../actions/actions';

const fetchCars = () => fetch('http://[::1]:3000/api/cars');

const fetchAllCars = () => (dispatch) => {
  fetchCars()
    .then((result) => result.json())
    .then((res) => dispatch(loadCars(res)))
    .catch((error) => dispatch(failCars(error.message)));
};
export default fetchAllCars;
