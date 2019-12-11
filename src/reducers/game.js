import ready from '../actions/ready';
import repeat from '../actions/repeat';
import setMove from '../actions/setMove';
import selectType from '../actions/selectType';
import changeStatus from '../actions/changeStatus';
import receiveReady from '../actions/receiveReady';
import receiveRepeat from '../actions/receiveRepeat';

/**
 * status:
 *   choose           -- waiting for game type to be chosen
 *   connect          -- waiting for opponent to connect
 *   place            -- waiting for all ships to be placed (switched automatically)
 *   confirm          -- waiting for confirm of ship placement
 *   wait             -- waiting for opponent to confirm ship placement
 *   play             -- waiting till all ship sank in any of seas
 *   victory, defeat  -- waiting for confirmation of new round
 *
 * type:
 *   pvp  -- you versus someone on network
 *   comp -- you versus computer
 *
 * isAllyReady  -- flag shows that you confirmed ship placement
 * isEnemyReady -- flag shows that your opponent confirmed ship placement
 *
 * isAllyWantRepeat  -- flag shows that you agreed on another round
 * isEnemyWantRepeat -- flag shows that your opponent agreed on another round
 *
 * move -- flag shows if it's your turn to fire
 * in comp mode your it's turn at every round start
 * in pvp mode it's changing alternately with every new round
 * and in first round client peer fires first
 */

const initialState = (status = `choose`, move = false) => ({
  type: null,
  isAllyReady: false,
  isEnemyReady: false,
  isAllyWantRepeat: false,
  isEnemyWantRepeat: false,
  status,
  move,
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case `SELECT_TYPE`:
      return selectType(state, action);

    case `CHANGE_STATUS`:
      return changeStatus(state, action);

    case `READY`:
      return ready(state);

    case `REPEAT`:
      return repeat(state);

    case `SEND`: {
      switch (action.payload.type) {
        case `feedback`:
          return action.payload.feedback === `miss`
            ? setMove(state)
            : state;

        case `victory`:
          return changeStatus(state, { payload: `victory` });

        default:
          return state;
      }
    }

    case `RECEIVE`: {
      switch (action.payload.type) {
        case `ready`:
          return receiveReady(state);

        case `repeat`:
          return receiveRepeat(state);

        case `feedback`:
          return action.payload.feedback === `miss`
            ? setMove(state)
            : state;

        case `victory`:
          return changeStatus(state, { payload: `defeat` });

        default:
          return state;
      }
    }

    case `SET_MOVE`:
      return action.payload
        ? setMove(state)
        : state;

    case `RESET`:
      return initialState();

    case `NEW_ROUND`:
      return initialState(`place`, state.type === 'pvp' ? !state.move : true);

    default:
      return state;
  }
}
