import isThereShip from './isThereShip';

/**
 * input: coordinates of `a` cell
 * return: array of not-false `ship` parameters of all `b` cells
 * (going clockwise, starting with top)
 *
 * ____________
 * |___|_b_|___|
 * |_b_|_a_|_b_|
 * |___|_b_|___|
 */

export default (sea, [x, y]) =>
  [
    isThereShip(sea, [x - 1, y]),
    isThereShip(sea, [x + 1, y]),
    isThereShip(sea, [x, y - 1]),
    isThereShip(sea, [x, y + 1]),
  ].filter(i => i);