import getShip from '../scripts/getShip';
import placeShip from '../scripts/placeShip';
import countShips from '../scripts/countShips';
import isThereShip from '../scripts/isThereShip';
import getCoordinates from '../scripts/getCoordinates';
import isThereShipInCross from '../scripts/isThereShipInCross';
import isThereShipDiagonally from '../scripts/isThereShipDiagonally';

export default (state, action) => {
  const newState = { ...state };
  const coordinates = getCoordinates(action.payload);

  const thereIsShip = isThereShip(newState.ally, coordinates);
  if (thereIsShip) {
    /**
     * if clicked on cell with ship deck, see if we can delete it
     */
    const [type, ship, deck] = getShip(thereIsShip);
    if (deck === 0) {
      /**
       * deleting first deck, adding null to the end of ship
       */
      newState.squadron[type][ship].shift();
      newState.squadron[type][ship].push(null);
      newState.squadron[type][ship].forEach((item, index) => {
        item && (newState.ally[item[1]][item[0]].ship = `${ type }-${ ship }-${ index }`);
      });
      newState.ally[coordinates[1]][coordinates[0]].ship = false;
    } else if (
      deck === newState.squadron[type][ship].length - 1 ||
      newState.squadron[type][ship][deck + 1] === null
    ) {
      /**
       * deleting last not-null deck
       */
      newState.squadron[type][ship][deck] = null;
      newState.ally[coordinates[1]][coordinates[0]].ship = false;
    }

    /**
     * if clicked not on first or last deck -- do nothing
     */
    return countShips(newState);
  }

  const thereIsShipDiagonally = isThereShipDiagonally(newState.ally, coordinates);
  if (thereIsShipDiagonally) return newState;

  const thereIsShipInCross = isThereShipInCross(newState.ally, coordinates);
  if (thereIsShipInCross) {
    /**
     * if clicked at the cell next to any ship cell
     * horizontally or vertically,
     * see if we can add deck with this cell coordinates
     * to this ship
     */
    const [type, ship] = thereIsShipInCross.split(`-`).map(item => parseInt(item));
    for (let newDeck = 1; newDeck < newState.squadron[type][ship].length; newDeck++) {
      if (newState.squadron[type][ship][newDeck] === null) {
        const toStart = (
          coordinates[0] < newState.squadron[type][ship][0][0] ||
          coordinates[1] < newState.squadron[type][ship][0][1]
        );
        return placeShip(type, ship, newDeck, coordinates, newState, toStart);
      }
    }

    return newState;
  }

  for (let type = 0; type < newState.squadron.length; type++) {
    for (let ship = 0; ship < newState.squadron[type].length; ship++) {
      for (let deck = 0; deck < newState.squadron[type][ship].length; deck++) {
        /**
         * look for first null deck of all ships
         */
        if (newState.squadron[type][ship][deck] === null) {
          /**
           * if it isn`t first deck of this ship -- do nothing
           * (clicked cell must be next to existent deck in cross to add new deck)
           * it`s made to prevent breaking descending order of ship placement
           */
          return deck === 0
            ? placeShip(type, ship, deck, coordinates, newState, false)
            : newState;
        }
      }
    }
  }

  return newState;
}
