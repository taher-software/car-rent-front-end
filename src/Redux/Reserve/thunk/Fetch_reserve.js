import { allReserve, failReserve } from '../actions/action';

const reserveUrl = 'http://[::1]:3000/api/reservations';

const getReserveUrl = () => fetch(reserveUrl);

const fetchReserve = () => (dispatch) => {
  getReserveUrl()
    .then((result) => result.json())
    .then((data) => dispatch(allReserve(data)))
    .catch((error) => dispatch(failReserve(error)));
};

export default fetchReserve;
