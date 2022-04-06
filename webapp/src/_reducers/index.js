import { combineReducers } from 'redux';
import global from './global_reducer';
import auth from './auth_reducer';
import user from './user_reducer';
import team from './team_reducer';

const rootReducer = combineReducers({
  auth,
  user,
  team,
  global,
});

export default rootReducer;
