import countShips from './countShips';

/**
 * adding new deck to the ship;
 * renewing `ship` parameter of all cells of that ship
 */

export default (type, ship, deck, coordinates, state, toStart) => {
  const { squadron, ally } = state;

  if (toStart) {
    squadron[type][ship].pop();
    squadron[type][ship].unshift(coordinates);
  } else {
    squadron[type][ship][deck] = coordinates;
  }

  squadron[type][ship].forEach((item, index) => {
    item && (ally[item[1]][item[0]].ship = [type, ship, index]);
  });

  return countShips({ ...state, squadron, ally });
}
