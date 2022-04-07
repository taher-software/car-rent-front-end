import { GET_USERNAME_DATA, FAIL_USERNAME_DATA } from '../actions/action';

const initialState = {};

const Usernamereducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME_DATA:
      return { ...action.payload };
    case FAIL_USERNAME_DATA:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default Usernamereducer;
