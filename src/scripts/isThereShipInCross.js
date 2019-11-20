/**
 * input: coordinates of `a` cell
 * return: ship parameter of any `b` cell
 * (going clockwise, starting with top)
 *
 * ____________
 * |___|_b_|___|
 * |_b_|_a_|_b_|
 * |___|_b_|___|
 *
 */

export default (sea, coordinates) => (
  (
    sea[coordinates[1] - 1] &&
    sea[coordinates[1] - 1][coordinates[0]] &&
    sea[coordinates[1] - 1][coordinates[0]].ship
  ) || (
    sea[coordinates[1] + 1] &&
    sea[coordinates[1] + 1][coordinates[0]] &&
    sea[coordinates[1] + 1][coordinates[0]].ship
  ) || (
    sea[coordinates[0] - 1] &&
    sea[coordinates[1]][coordinates[0] - 1] &&
    sea[coordinates[1]][coordinates[0] - 1].ship
  ) || (
    sea[coordinates[0] + 1] &&
    sea[coordinates[1]][coordinates[0] + 1] &&
    sea[coordinates[1]][coordinates[0] + 1].ship
  )
);
