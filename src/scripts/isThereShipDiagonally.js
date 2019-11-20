/**
 * input: coordinates of `a` cell
 * return: ship parameter of any `b` cell
 * (going clockwise, starting with left-top)
 *
 * ____________
 * |_b_|___|_b_|
 * |___|_a_|___|
 * |_b_|___|_b_|
 *
 */

export default (sea, coordinates) => (
  (
    sea[coordinates[1] - 1] && (
      (
        sea[coordinates[1] - 1][coordinates[0] - 1] &&
        sea[coordinates[1] - 1][coordinates[0] - 1].ship
      )
      ||
      (
        sea[coordinates[1] - 1][coordinates[0] + 1] &&
        sea[coordinates[1] - 1][coordinates[0] + 1].ship
      )
    )
  ) || (
    sea[coordinates[1] + 1] && (
      (
        sea[coordinates[1] + 1][coordinates[0] - 1] &&
        sea[coordinates[1] + 1][coordinates[0] - 1].ship
      )
      ||
      (
        sea[coordinates[1] + 1][coordinates[0] + 1] &&
        sea[coordinates[1] + 1][coordinates[0] + 1].ship
      )
    )
  )
);
