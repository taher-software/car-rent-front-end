import { GET_RESERVE_DATA, FAIL_RESERVE_DATA } from '../actions/action';

const initialState = {};

const ReserveReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVE_DATA:
      return action.payload;
    case FAIL_RESERVE_DATA:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default ReserveReducer;
