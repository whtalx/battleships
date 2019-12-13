export default (ship, sea) =>
  ship.reduce(
    (a, [x, y]) =>
      sea[y][x].hit && a,
    true
  );
