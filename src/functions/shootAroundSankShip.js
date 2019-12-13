/**
 * input: ship array
 * return: sea with all cells around ship setting miss parameter
 */

export default ({ ally, enemy, data }) => {
  const sea = ally || enemy;
  const ship = data;

  const [xs, ys] = ship.length === 1                // lengths of arrays of cells around ship
    ? [3, 3]                                        // for single decker it's 3x3
    : ship[1][1] - ship[0][1] === 0                 // check ship direction. 0 -- horizontal, ±1 -- vertical
      ? [ship.length + 2, 3]                        // ship length +2 cells around
      : [3, ship.length + 2];

  const condition = (x, y) =>                       // returns false if ship has cell with x and y coordinates
    ship.length === 1
      ? !(x === 1 && y === 1)
      : ship[1][1] - ship[0][1] === 0
        ? !(x > 0 && x < ship.length + 1 && y === 1)
        : !(y > 0 && y < ship.length + 1 && x === 1);

  const shoot = (x, y) => {
    const [x0, y0] = ship[0];                        // coordinates of first deck of the ship (leftmost or topmost)
    sea[y + y0 - 1] &&                               // -1 because 0 would hit first deck cell, and we need cell before
    sea[y + y0 - 1][x + x0 - 1] &&
    (sea[y + y0 - 1][x + x0 - 1].miss = true);
  };

  [...Array(ys).keys()].forEach(y =>
    [...Array(xs).keys()].forEach(x =>
      condition(x, y) && shoot(x, y)
    )
  );

  return sea;
}
