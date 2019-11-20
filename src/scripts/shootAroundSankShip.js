/**
 * input: ship array
 * return: sea with all cells around ship setting 'miss: true'
 */

export default (sea, ship) => {
  const [xsLength, ysLength] = ship.length === 1
    ? [3, 3]
    : ship[1][1] - ship[0][1] === 0
      ? [ship.length + 2, 3]
      : [3, ship.length + 2];

  const condition = (x, y) =>
    ship.length === 1
      ? !(x === 1 && y === 1)
      : ship[1][1] - ship[0][1] === 0
        ? !((x > 0 && x < ship.length + 1) && y === 1)
        : !((y > 0 && y < ship.length + 1) && x === 1);

  const shoot = (x, y) => {
    const head = ship[0];
    if (
      sea[y - 1 + head[1]] &&
      sea[y - 1 + head[1]][x - 1 + head[0]]
    ) {
      sea[y - 1 + head[1]][x - 1 + head[0]].miss = true;
    }
  };

  [...Array(ysLength).keys()].forEach(y => {
    [...Array(xsLength).keys()].forEach(x => {
      condition(x, y) && shoot(x, y);
    });
  });

  return sea;
}
