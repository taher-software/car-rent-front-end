import { loadUsername, failUsername } from '../actions/action';

export const fetchUser = () => fetch('https://car-rentals-backend.fly.dev/api/users');

const thunkUser = () => (dispatch) => {
  fetchUser()
    .then((result) => result.json())
    .then((res) => dispatch(loadUsername(res)))
    .catch((error) => dispatch(failUsername(error.message)));
};
export default thunkUser;
