/**
 * input: ship array
 * return: sea with all cells around ship setting miss parameter
 */

export default (sea, ship) => {
  const newSea = [...sea];
  const newShip = [...ship];

  const [xsLength, ysLength] = newShip.length === 1        // lengths of arrays of cells around ship
    ? [3, 3]                                              // for single decker (1x1) it's 3x3
    : newShip[1][1] - newShip[0][1] === 0
      ? [newShip.length + 2, 3]                           // ship length + 2 cells around
      : [3, newShip.length + 2];

  const condition = (x, y) =>                             // returns false if ship has cell with x and y coordinates
    newShip.length === 1
      ? !(x === 1 && y === 1)
      : newShip[1][1] - newShip[0][1] === 0
        ? !(x > 0 && x < newShip.length + 1 && y === 1)
        : !(y > 0 && y < newShip.length + 1 && x === 1);

  const shoot = (x, y) => {
    const head = newShip[0];                               // first deck of ship (leftmost or topmost)
    if (
      newSea[y - 1 + head[1]] &&                           // -1 because 0 would hit ship cell, and we need cell before
      newSea[y - 1 + head[1]][x - 1 + head[0]]
    ) {
      newSea[y - 1 + head[1]][x - 1 + head[0]].miss = true;
    }
  };

  [...Array(ysLength).keys()].forEach(y => {
    [...Array(xsLength).keys()].forEach(x => {
      condition(x, y) && shoot(x, y);
    });
  });

  return newSea;
}
