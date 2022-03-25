import { loadUsername, failUsername } from '../actions/action';

const fetchUser = () => fetch('https://agile-sands-67161.herokuapp.com/api/users');

const thunkUser = () => (dispatch) => {
  fetchUser()
    .then((result) => result.json())
    .then((res) => dispatch(loadUsername(res)))
    .catch((error) => dispatch(failUsername(error.message)));
};
export default thunkUser;