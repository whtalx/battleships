/**
 * input: coordinates of `a` cell
 * return: array of not-false ship parameters of all `b` cells
 * (going clockwise, starting with top)
 *
 * ____________
 * |___|_b_|___|
 * |_b_|_a_|_b_|
 * |___|_b_|___|
 *
 */

export default (sea, coordinates) => [
  (
    sea[coordinates[1] - 1] &&
    sea[coordinates[1] - 1][coordinates[0]] &&
    sea[coordinates[1] - 1][coordinates[0]].ship
  ),
  (
    sea[coordinates[1] + 1] &&
    sea[coordinates[1] + 1][coordinates[0]] &&
    sea[coordinates[1] + 1][coordinates[0]].ship
  ),
  (
    sea[coordinates[1]][coordinates[0] - 1] &&
    sea[coordinates[1]][coordinates[0] - 1].ship
  ),
  (
    sea[coordinates[1]][coordinates[0] + 1] &&
    sea[coordinates[1]][coordinates[0] + 1].ship
  ),
].filter(i => i);
