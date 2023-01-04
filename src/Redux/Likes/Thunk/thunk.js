import { startGetLIkes, getLIkes, failGetLikes } from '../Action/action';

const url = 'https://car-rentals-backend.fly.dev/api/likes';
export const fetchLikes = () => (fetch(url));
const thunkLikes = () => (dispatch) => {
  dispatch(startGetLIkes());
  fetchLikes()
    .then((res) => res.json())
    .then((result) => dispatch(getLIkes(result)))
    .catch((err) => dispatch(failGetLikes(err.message)));
};

export default thunkLikes;
