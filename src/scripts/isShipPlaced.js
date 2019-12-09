import getShip from './getShip';

export default ({ cell, squadron }) => {
  if (!cell) return false;

  const [type, ship] = getShip(cell);

  return squadron[type][ship].reduce(
    (completed, deck) => completed ? deck !== null : false,
    true
  );
};
