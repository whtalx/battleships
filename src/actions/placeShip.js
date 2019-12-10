import getShip from '../scripts/getShip';
import makeDeck from '../scripts/makeDeck';
import removeDeck from '../scripts/removeDeck';
import isThereShip from '../scripts/isThereShip';
import getCoordinates from '../scripts/getCoordinates';
import isThereShipInCross from '../scripts/isThereShipInCross';
import isThereShipDiagonally from '../scripts/isThereShipDiagonally';

export default (state, action) => {
  const newState = { ...state };
  const coordinates = getCoordinates(action.payload);

  /**
   * removing decks from ship
   */
  const thereIsShip = isThereShip(newState.ally, coordinates);
  if (thereIsShip) {
    /**
     * removing possible only with ends of ships,
     * decks in the middle could not be deleted
     */
    const [type, ship, deck] = getShip(thereIsShip);
    return (deck === 0 || !newState.squadron[type][ship][deck + 1])
      ? removeDeck(type, ship, deck, coordinates, newState)
      : newState;
  }

  /**
   * doing nothing if there are ships diagonally
   */
  const thereIsShipDiagonally = isThereShipDiagonally(newState.ally, coordinates);
  if (thereIsShipDiagonally) return newState;

  /**
   * adding deck to the ship
   */
  const thereIsShipInCross = isThereShipInCross(newState.ally, coordinates);
  if (thereIsShipInCross.length === 1) {
    /**
     * if clicked at the cell next to only one ship
     * horizontally or vertically,
     * see if we can add deck with this cell coordinates
     * to this ship
     */
    const [type, ship] = thereIsShipInCross[0].split(`-`).map(item => parseInt(item));
    for (let newDeck = 1; newDeck < newState.squadron[type][ship].length; newDeck++) {
      if (newState.squadron[type][ship][newDeck] === null) {
        const toStart = (
          coordinates[0] < newState.squadron[type][ship][0][0] ||
          coordinates[1] < newState.squadron[type][ship][0][1]
        );
        return makeDeck(type, ship, newDeck, coordinates, newState, toStart);
      }
    }

    return newState;
  }

  /**
   * placing new ship
   */
  for (let i = 0; i < newState.squadron[newState.deckToPlace.type].length; i++) {
    const ship = newState.squadron[newState.deckToPlace.type][i];
    const shipIsFull = ship.filter(i => i).length === ship.length;
    if (shipIsFull) continue;
      /**
       * new deck must be first deck of ship,
       * adding decks handled previously with `thereIsShipInCross`.
       * it`s made to prevent breaking order of ship placement
       * (four decker -> three decker -> two decker -> single decker)
       */
    return ship[0] === null
      ? makeDeck(newState.deckToPlace.type, i, 0, coordinates, newState, false)
      : newState;
  }

  return newState;
}
