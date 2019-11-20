import { combineReducers } from 'redux';
import game from './game';
import rtc from './rtc';
import sea from './sea';

const reducers = combineReducers({
  game,
  rtc,
  sea,
});

export default reducers;
