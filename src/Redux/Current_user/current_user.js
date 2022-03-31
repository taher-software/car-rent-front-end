import { populateStorage, fetchStorage } from '../../helper/localStorage';

export const UPDATE_CURRENT_USER = 'CAR-RENT/CURRENT-USER/UPDATE';

export const updateCurrentUser = (payload) => ({
  type: UPDATE_CURRENT_USER,
  payload,
});
let initialUser = fetchStorage('current_user');
if (!initialUser) {
  initialUser = {};
}

export const currentUserReducer = (state = initialUser, action) => {
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
