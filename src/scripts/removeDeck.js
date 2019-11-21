import countShips from './countShips';

/**
 * removing deck from the ship;
 * removing 'ship' parameter of cell of removed deck
 * and renewing it for the rest cells of that ship
 */

export default (type, ship, deck, coordinates, state) => {
  const newState = { ...state };

  newState.squadron[type][ship].splice(deck, 1);
  newState.squadron[type][ship].push(null);

  newState.ally[coordinates[1]][coordinates[0]].ship = false;
  newState.squadron[type][ship].forEach((item, index) => {
    item && (newState.ally[item[1]][item[0]].ship = `${ type }-${ ship }-${ index }`);
  });

  return countShips(newState);
}
