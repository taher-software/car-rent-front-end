import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Usernamereducer from './Username/reducer/reducer';
import { currentUserReducer } from './current_user';

const sessionReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    case 'SIGNUP':
      return true;
    default:
      return state;
  }
};
const reducer = combineReducers({
  Users: Usernamereducer,
  session: sessionReducer,
  current_user: currentUserReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
