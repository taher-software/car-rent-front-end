import { loadUsername, failUsername } from '../actions/action';

const fetchUser = () => fetch('https://warm-inlet-48309.herokuapp.com/api/users');

const thunkUser = () => (dispatch) => {
  fetchUser()
    .then((result) => result.json())
    .then((res) => dispatch(loadUsername(res)))
    .catch((error) => dispatch(failUsername(error.message)));
};
export default thunkUser;
