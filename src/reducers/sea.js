import makeSea from '../functions/makeSea';
import placeShip from '../actions/placeShip';
import receiveFire from '../actions/receiveFire';
import sendVictory from '../actions/sendVictory';
import makeSquadron from '../functions/makeSquadron';
import clearFeedback from '../actions/clearFeedback';
import randomPlacing from '../actions/randomPlacing';
import receiveVictory from '../actions/receiveVictory';
import receiveFeedback from '../actions/receiveFeedback';

/**
 * ally            -- your sea
 * enemy           -- your opponent sea
 * squadron        -- see ../scripts/makeSquadron
 * shipsToPlace    -- number of ships to be placed (for triggering 'confirm' state)
 * deckToPlace     -- next deck to be placed ({ type, ship, deck } are indexes of state.squadron[type][ship][deck])
 * allyShipsLeft   -- number of your ships on water (not-sank)
 * enemyShipsLeft  -- number of your opponent ships on water (not-sank)
 * feedback        -- feedback message formed for sending
 */

export const initialState = () => ({
  ally: makeSea(`ally`),
  enemy: makeSea(`enemy`),
  squadron: makeSquadron(),
  shipsToPlace: 10,
  deckToPlace: {
    type: 0,
    ship: 0,
    deck: 0
  },
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
      return randomPlacing({
        ...state,
        ally: makeSea(`ally`),
        squadron: makeSquadron(),
      });

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
