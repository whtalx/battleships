import makeSea from '../scripts/makeSea';
import placeShip from '../actions/placeShip';
import receiveFire from '../actions/receiveFire';
import sendVictory from '../actions/sendVictory';
import makeSquadron from '../scripts/makeSquadron';
import clearFeedback from '../actions/clearFeedback';
import randomPlacing from '../actions/randomPlacing';
import receiveVictory from '../actions/receiveVictory';
import receiveFeedback from '../actions/receiveFeedback';

/**
 * ally               -- your sea
 * enemy              -- your opponent sea
 * squadron           -- see ../scripts/makeSquadron
 * shipsToPlace       -- number of ships to be placed (by type)
 * shipsToPlace.total -- total number of ships to be placed (for triggering 'confirm' state)
 * currentType        -- type (index) of ship that will be placed next (for arrow indicator in Placing component)
 * allyShipsLeft      -- number of your ships on water (not-sank)
 * enemyShipsLeft     -- number of your opponent ships on water (not-sank)
 * feedback           -- feedback message, formed for sending
 */

const initialState = () => ({
  ally: makeSea(`ally`),
  enemy: makeSea(`enemy`),
  squadron: makeSquadron(),
  shipsToPlace: {
    fourDecker: 1,
    threeDecker: 2,
    twoDecker: 3,
    singleDecker: 4,
    total: 10,
  },
  currentType: 0,
  allyShipsLeft: 10,
  enemyShipsLeft: 10,
  feedback: null,
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case `SEND`:
      return (
        action.payload.type === `feedback` ||
        action.payload.type === `defeat` ||
        action.payload.type === `victory`
      )
        ? clearFeedback(state)
        : state;

    case `PLACE_SHIP`:
      return placeShip(state, action);

    case `RANDOM`:
      return randomPlacing({ ...state, ally: makeSea(`ally`), squadron: makeSquadron(), });

    case `RECEIVE`: {
      switch (action.payload.type) {
        case `fire`:
          return receiveFire(state, action);

        case `feedback`:
          return receiveFeedback(state, action);

        case `victory`:
          return receiveVictory(state, action);

        case `defeat`:
          return sendVictory(state, action);

        default:
          return state;
      }
    }

    case `RESET`:
    case `NEW_ROUND`:
      return initialState();

    default:
      return state;
  }
};