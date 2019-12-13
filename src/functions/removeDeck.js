import countShips from './countShips';

/**
 * removing deck from the ship;
 * removing `ship` parameter of cell of removed deck
 * and renewing it for the rest cells of that ship
 */

export default (type, ship, deck, [x, y], state) => {
  const { ally, squadron} = state;

  squadron[type][ship].splice(deck, 1);
  squadron[type][ship].push(null);

  ally[y][x].ship = false;
  squadron[type][ship].forEach((item, index) => {
    item && (ally[item[1]][item[0]].ship = [type, ship, index]);
  });

  return countShips({ ...state, ally, squadron });
}
