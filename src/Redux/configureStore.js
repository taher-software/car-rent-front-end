import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Usernamereducer from './Username/reducer/reducer';
import { currentUserReducer } from './Current_user/current_user';
import { fetchStorage } from '../helper/localStorage';

const initialSession = fetchStorage('current_user') !== null;
const sessionReducer = (state = initialSession, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
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
