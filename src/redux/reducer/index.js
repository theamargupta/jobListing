import { combineReducers } from 'redux';
import createReducer from './createReducer';
import jobsReducer from './jobsReducer';

const rootReducer = combineReducers({
  user: createReducer,
  jobs:jobsReducer,
});
export default rootReducer;
