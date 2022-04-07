import { GET_CARS_DATA, FAIL_CARS_DATA } from '../actions/actions';

const intialState = {};

const Carsreducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_CARS_DATA:
      return action.payload;
    case FAIL_CARS_DATA:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default Carsreducer;
