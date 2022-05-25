import { combineReducers } from 'redux';
import global from './global_reducer';
import auth from './auth_reducer';

const rootReducer = combineReducers({
  auth,
  global,
});

export default rootReducer;
