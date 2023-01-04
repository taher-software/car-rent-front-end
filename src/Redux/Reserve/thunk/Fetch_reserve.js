import { allReserve, failReserve } from '../actions/action';

const reserveUrl = 'https://car-rentals-backend.fly.dev/api/reservations';

export const getReserveUrl = () => fetch(reserveUrl);

const fetchReserve = () => (dispatch) => {
  getReserveUrl()
    .then((result) => result.json())
    .then((data) => dispatch(allReserve(data)))
    .catch((error) => dispatch(failReserve(error)));
};

export default fetchReserve;
