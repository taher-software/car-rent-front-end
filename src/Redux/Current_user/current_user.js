import { populateStorage } from '../../helper/localStorage';

export const UPDATE_CURRENT_USER = 'CAR-RENT/CURRENT-USER/UPDATE';

export const updateCurrentUser = (payload) => ({
  type: UPDATE_CURRENT_USER,
  payload,
});

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      populateStorage(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
