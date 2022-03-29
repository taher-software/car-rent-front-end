import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Usernamereducer from './Username/reducer/reducer';
import { currentUserReducer } from './current_user';
import { fetchStorage } from '../helper/localStorage';

const initialSession = fetchStorage('current_user') !== null;
let initialSessionState = initialSession;
if (initialSession) {
  const users = fetch('http://127.0.0.1:3002/api/users')
    .then((res) => res.json());
  const usernames = users.users.map((user) => user.username);
  if (!usernames.includes(fetchStorage('current_user'))) {
    initialSessionState = false;
  }
}
const sessionReducer = (state = initialSessionState, action) => {
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
