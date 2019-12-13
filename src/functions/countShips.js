/**
 * shipsToPlace -- sum of ships that have at least one null deck
 * deckToPlace -- object with indexes (type, ship, deck) of first null deck in squadron
 */

export default (state) => {
  let changed = false;
  let { squadron, deckToPlace } = state;
  const shipsToPlace = squadron.reduce(
      (types, typeObj, type) =>
        types + typeObj.reduce(
          (ships, shipObj, ship) =>
            ships + shipObj.reduce(
              (decks, deckObj, deck) => {
                if (deckObj === null) {
                  if (!changed) {
                    deckToPlace = { type, ship, deck };
                    changed = true;
                  }
                  return 1;
                }

                return decks;
              },
              0
            ),
          0
        ),
      0
    );

  return {
    ...state,
    shipsToPlace,
    deckToPlace,
  };
}
