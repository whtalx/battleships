import { combineReducers } from 'redux';
import game from './game';
import peer from './peer';
import sea from './sea';

export default combineReducers({
  game,
  peer,
  sea,
});
