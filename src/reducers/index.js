import { combineReducers } from 'redux';
import game from './game';
import peer from './peer';
import sea from './sea';

const reducers = combineReducers({
  game,
  peer,
  sea,
});

export default reducers;
