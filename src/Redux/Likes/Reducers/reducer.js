import { GET_LIKES_DATA, START_LIKES_DATA, FAILURE_LIKES_DATA } from "../Action/action"

const likesReducer = (state = {}, action) => {
  switch (action.type) {
      case START_LIKES_DATA:
        return {
            ...state,
            loading: true,
            error: false
        };
      case GET_LIKES_DATA:
        return {
          ...state,
          ...action.payload,
          loading: false,
        };
      case FAILURE_LIKES_DATA:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
  }
};

export default likesReducer;