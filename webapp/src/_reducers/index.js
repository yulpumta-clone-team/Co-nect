import { combineReducers } from 'redux';
import global from './global_reducer';

const rootReducer = combineReducers({
  global,
});

export default rootReducer;
