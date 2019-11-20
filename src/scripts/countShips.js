/**
 * counting ships to be placed
 * takes every ship in array 'type',
 * if ship has null as element - returns 1 (as one that need placement),
 * if not -- 0 (as placed).
 * then returns number of ships that not placed
 */

const count = (type) => type
  .map(item =>
    item[0] === null
      ? 1
      : item.length === 1
      ? 0
      : item.reduce((a, b) =>
        a === 1
          ? 1
          : b === null
          ? 1
          : 0
      )
  )
  .reduce((a, b) => a + b);

export default (state) => {
  const newState = { ...state };
  newState.shipsToPlace.fourDecker = count(state.squadron[0]);
  newState.shipsToPlace.threeDecker = count(state.squadron[1]);
  newState.shipsToPlace.twoDecker = count(state.squadron[2]);
  newState.shipsToPlace.singleDecker = count(state.squadron[3]);
  newState.shipsToPlace.total = 0;

  const numbers = Object.values(newState.shipsToPlace);
  newState.shipsToPlace.total = numbers.reduce((a, b) => a + b);
  newState.currentType = numbers.findIndex(a => a !== 0);

  return newState;
}
