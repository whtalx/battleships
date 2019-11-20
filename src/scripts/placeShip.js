import countShips from './countShips';

/**
 * adding new deck to the ship;
 * renewing 'ship' parameter of all cells of that ship
 */

export default (type, ship, deck, coordinates, state, toStart) => {
  const newState = { ...state };

  if (toStart) {
    newState.squadron[type][ship].pop();
    newState.squadron[type][ship].unshift(coordinates);
  } else {
    newState.squadron[type][ship][deck] = coordinates;
  }

  newState.squadron[type][ship].forEach((item, index) => {
    item && (newState.ally[item[1]][item[0]].ship = `${ type }-${ ship }-${ index }`);
  });

  return countShips(newState);
}
