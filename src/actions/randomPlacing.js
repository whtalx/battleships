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

const getRandomCoordinates = (state, type) => {
  const newState = { ...state };
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
  const coordinates = [
    Math.floor(Math.random() * (10 + shifts[type][direction][0])),
    Math.floor(Math.random() * (10 + shifts[type][direction][1])),
  ];

  try {
    for (let i = -1; i <= newState.squadron[type][0].length + 1; i++) {
      if (
        (
          direction === 1 &&
          newState.ally[coordinates[1] + i] && (
            (
              newState.ally[coordinates[1] + i][coordinates[0] - 1] &&
              newState.ally[coordinates[1] + i][coordinates[0] - 1].ship
            ) || (
              newState.ally[coordinates[1] + i][coordinates[0]] &&
              newState.ally[coordinates[1] + i][coordinates[0]].ship
            ) || (
              newState.ally[coordinates[1] + i][coordinates[0] + 1] &&
              newState.ally[coordinates[1] + i][coordinates[0] + 1].ship
            )
          )
        ) || (
          direction === 0 && (
            (
              newState.ally[coordinates[1] - 1] &&
              newState.ally[coordinates[1] - 1][coordinates[0] + i] &&
              newState.ally[coordinates[1] - 1][coordinates[0] + i].ship
            ) || (
              newState.ally[coordinates[1]][coordinates[0] + i] &&
              newState.ally[coordinates[1]][coordinates[0] + i].ship
            ) || (
              newState.ally[coordinates[1] + 1] &&
              newState.ally[coordinates[1] + 1][coordinates[0] + i] &&
              newState.ally[coordinates[1] + 1][coordinates[0] + i].ship
            )
          )
        )
      ) {
        return getRandomCoordinates(newState, type);
      }
    }
  } catch ({ message }) {
    console.error(message);
    return {};
  }

  return { coordinates, direction };
};

export default (state) => {
  const newState = { ...state };

  try {
      newState.squadron.forEach((_, type) => {
        newState.squadron[type].forEach((_, ship) => {
          const { coordinates, direction } = getRandomCoordinates(newState, type);
          if (!coordinates) throw new Error(`Browser too weak for such recursion 😔`);

          newState.squadron[type][ship] = newState.squadron[type][ship].map((_, index) =>
            direction === 0
              ? [coordinates[0] + index, coordinates[1]]
              : [coordinates[0], coordinates[1] + index]
          );

          newState.squadron[type][ship].forEach((item, deck) => {
            newState.ally[item[1]][item[0]].ship = `${ type }-${ ship }-${ deck }`;
          });
        })
      });
  } catch ({ message }) {
    console.error(message);
  }

  return countShips(newState);
};
