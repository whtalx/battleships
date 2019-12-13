/**
 * returns ship parameter of cell with current coordinates
 */

export default (sea, [x, y]) =>
  sea[y] &&
  sea[y][x] &&
  sea[y][x].ship;
