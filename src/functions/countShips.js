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
  const shipsToPlace = state.squadron.reduce((sum, type) => sum + count(type), 0);
  let deckToPlace = { ...state.deckToPlace };

  findNext:
    for (let type = 0; type < state.squadron.length; type++) {
      for (let ship = 0; ship < state.squadron[type].length; ship++) {
        for (let deck = 0; deck < state.squadron[type][ship].length; deck++) {
          if (state.squadron[type][ship][deck] === null) {
            deckToPlace = { type, ship, deck };
            break findNext;
          }
        }
      }
    }

  return {
    ...state,
    shipsToPlace,
    deckToPlace,
  };
}
