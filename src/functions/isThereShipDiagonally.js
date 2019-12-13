import isThereShip from './isThereShip';

/**
 * input: coordinates of `a` cell
 * return: true if `ship` parameter of any `b` cell is not false/null/undefined
 *
 * ____________
 * |_b_|___|_b_|
 * |___|_a_|___|
 * |_b_|___|_b_|
 */

export default (sea, [x, y]) =>
  [
    isThereShip(sea, [x - 1, y - 1]),
    isThereShip(sea, [x + 1, y - 1]),
    isThereShip(sea, [x - 1, y + 1]),
    isThereShip(sea, [x + 1, y + 1]),
  ].filter(i => i).length > 0;
