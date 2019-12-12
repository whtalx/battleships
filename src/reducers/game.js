import ready from '../actions/ready';
import repeat from '../actions/repeat';
import setMove from '../actions/setMove';
import selectType from '../actions/selectType';
import setFirstMove from '../actions/setFirstMove';
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
 * move      -- flag shows if it's your turn to fire
 * firstMove -- flag shows that it's turn at next round start
 *   it's changing alternately with every new round
 *   in pvp mode client peer starts first round
 *   in comp mode player starts first round
 */

const initialState = (status = `choose`, move = false) => ({
  type: null,
  isAllyReady: false,
  isEnemyReady: false,
  isAllyWantRepeat: false,
  isEnemyWantRepeat: false,
  firstMove: move,
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

    case `SET_FIRST_MOVE`:
      return setFirstMove(state, action);

    case `RESET`:
      return initialState();

    case `NEW_ROUND`:
      return initialState(`place`, state.firstMove);

    default:
      return state;
  }
}
