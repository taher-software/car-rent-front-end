import { loadCars, failCars } from '../actions/actions';

export const fetchCars = () => fetch('https://car-rentals-backend.fly.dev/api/cars');

const fetchAllCars = () => (dispatch) => {
  fetchCars()
    .then((result) => result.json())
    .then((res) => dispatch(loadCars(res)))
    .catch((error) => dispatch(failCars(error.message)));
};
export default fetchAllCars;
