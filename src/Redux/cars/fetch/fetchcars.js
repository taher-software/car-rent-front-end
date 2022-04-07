import { loadCars, failCars } from '../actions/actions';

export const fetchCars = () => fetch('https://warm-inlet-48309.herokuapp.com/api/cars');

const fetchAllCars = () => (dispatch) => {
  fetchCars()
    .then((result) => result.json())
    .then((res) => dispatch(loadCars(res)))
    .catch((error) => dispatch(failCars(error.message)));
};
export default fetchAllCars;
