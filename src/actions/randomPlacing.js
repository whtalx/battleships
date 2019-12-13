import countShips from '../functions/countShips';

const shifts = [ // constraints of coordinates of first deck for all ship types
  [
    [-3, 0],
    [0, -3],
  ],
  [
    [-2, 0],
    [0, -2],
  ],
  [
    [-1, 0],
    [0, -1],
  ],
  [
    [0, 0],
    [0, 0],
  ],
];

const getRandomCoordinates = ({ ally, squadron, type }) => {
  /**
   * create random coordinates in constrained range;
   * check if there is ships diagonally or in cross
   * to first deck with this coordinates and all other decks;
   * if there is -- create new coordinates recursively.
   * first deck of ship is leftmost or topmost
   * for horizontal or vertical direction respectively
   *
   * output is coordinates of first deck and placing direction of other decks
   */
  const direction = Math.floor(Math.random() + .5); // 0 == horizontal, 1 == vertical
  const x = Math.floor(Math.random() * (10 + shifts[type][direction][0]));
  const y = Math.floor(Math.random() * (10 + shifts[type][direction][1]));

  try {
    for (let i = -1; i <= squadron[type][0].length + 1; i++) {
      if (
        (
          direction === 1 &&
          ally[y + i] && (
            (
              ally[y + i][x - 1] &&
              ally[y + i][x - 1].ship
            ) || (
              ally[y + i][x] &&
              ally[y + i][x].ship
            ) || (
              ally[y + i][x + 1] &&
              ally[y + i][x + 1].ship
            )
          )
        ) || (
          direction === 0 && (
            (
              ally[y - 1] &&
              ally[y - 1][x + i] &&
              ally[y - 1][x + i].ship
            ) || (
              ally[y][x + i] &&
              ally[y][x + i].ship
            ) || (
              ally[y + 1] &&
              ally[y + 1][x + i] &&
              ally[y + 1][x + i].ship
            )
          )
        )
      ) {
        return getRandomCoordinates({ ally, squadron, type });
      }
    }
  } catch ({ message }) {
    console.error(message);
    return {};
  }

  return { coordinates: [x, y], direction };
};

export default (state) => {
  const { ally, squadron } = state;

  try {
      squadron.forEach((_, type) => {
        squadron[type].forEach((_, ship) => {
          const { coordinates, direction } = getRandomCoordinates({ ally, squadron, type });
          if (!coordinates) throw new Error(`Browser too weak for such recursion 😔`);

          const [x, y] = coordinates;
          squadron[type][ship] = squadron[type][ship].map((_, index) =>
            direction === 0
              ? [x + index, y]
              : [x, y + index]
          );

          squadron[type][ship].forEach((item, deck) => {
            ally[item[1]][item[0]].ship = [type, ship, deck];
          });
        })
      });
  } catch ({ message }) {
    console.error(message);
  }

  return countShips({ ...state, ally, squadron });
};
