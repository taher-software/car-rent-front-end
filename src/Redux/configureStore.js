import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Usernamereducer from './Username/reducer/reducer';

const reducer = combineReducers({ Users: Usernamereducer });

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
