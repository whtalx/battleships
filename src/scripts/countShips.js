/**
 * counting ships to be placed
 * takes every ship in array 'type',
 * if ship has null as element - returns 1 (as one that need placement),
 * if not -- 0 (as placed).
 * then returns number of ships that not placed
 */

const count = (type) => type
  .map(item =>                  // let's take a ship
    item[0] === null            // i'ts first deck empty?
      ? 1                       // it should be placed
      : item.length === 1       // it's single decker?
      ? 0                       // nothing to do here
      : item.reduce((a, b) =>   // let's look at all it's decks
        a === 1                 // was there empty deck earlier?
          ? 1                   // there was, keep it to the end
          : b === null          // is this deck empty?
            ? 1                 // it should be placed
            : 0                 // nothing to do here
      )
  )
  .reduce((a, b) => a + b);     // sum of all ships that need to be placed

export default (state) => {
  const shipsToPlace = {
    fourDecker: count(state.squadron[0]),
    threeDecker: count(state.squadron[1]),
    twoDecker: count(state.squadron[2]),
    singleDecker: count(state.squadron[3]),
  };

  const numbers = Object.values(shipsToPlace);
  shipsToPlace.total = numbers.reduce((a, b) => a + b);
  const currentType = numbers.findIndex(a => a !== 0);

  return {
    ...state,
    shipsToPlace,
    currentType,
  };
}
