import countShips from '../scripts/countShips';

export default (state) => {
  const newState = { ...state };
  const getDirection = () => Math.round(Math.random()); // 0 == horizontal, 1 == vertical
  const shifts = [                                      // constraints of coordinates of first deck for all ship types
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

  const getRandomCoordinates = (type, direction) => {
    /**
     * create random coordinates in constrained range;
     * check if there is ships diagonally or in cross
     * to first deck with this coordinates and all other decks;
     * if there is -- create new coordinates recursively.
     * first deck of ship is leftmost or topmost
     * for horizontal or vertical direction respectively
     */
    /**
     * TODO: handle case with too much recursion
     * > currently 'too much recursion' error leaves state
     * > with all ships placed except those that weren't placed when error appears
     * > you may place them manually, however in 'comp' mode AI can't
     */

    let coordinates = [
      Math.floor(Math.random() * (10 + shifts[type][direction][0])),
      Math.floor(Math.random() * (10 + shifts[type][direction][1])),
    ];

    try {
      for (let i = -1; i <= newState.squadron[type][0].length + 1; i++) {
        if (
          (
            direction &&
            newState.ally[coordinates[1] + i] !== undefined && (
              (
                newState.ally[coordinates[1] + i][coordinates[0] - 1] !== undefined &&
                newState.ally[coordinates[1] + i][coordinates[0] - 1].ship
              ) || (
                newState.ally[coordinates[1] + i][coordinates[0]] !== undefined &&
                newState.ally[coordinates[1] + i][coordinates[0]].ship
              ) || (
                newState.ally[coordinates[1] + i][coordinates[0] + 1] !== undefined &&
                newState.ally[coordinates[1] + i][coordinates[0] + 1].ship
              )
            )
          ) || (
            (
              newState.ally[coordinates[1] - 1] !== undefined &&
              newState.ally[coordinates[1] - 1][coordinates[0] + i] !== undefined &&
              newState.ally[coordinates[1] - 1][coordinates[0] + i].ship
            ) || (
              newState.ally[coordinates[1]][coordinates[0] + i] !== undefined &&
              newState.ally[coordinates[1]][coordinates[0] + i].ship
            ) || (
              newState.ally[coordinates[1] + 1] !== undefined &&
              newState.ally[coordinates[1] + 1][coordinates[0] + i] !== undefined &&
              newState.ally[coordinates[1] + 1][coordinates[0] + i].ship
            )
          )
        ) {
          return getRandomCoordinates(type, direction);
        }
      }
    } catch (e) {
      console.error(e);
      return;
    }
    return coordinates;
  };

  const place = (state) => {
    const brandNewState = { ...state };

    try {
      brandNewState.squadron.forEach((_, type) => {
        brandNewState.squadron[type].forEach((_, ship) => {
          const direction = getDirection();
          const coordinates = getRandomCoordinates(type, direction);
          if (!coordinates) throw new Error(`browser too weak for such recursion 😔`);

          brandNewState.squadron[type][ship] = brandNewState.squadron[type][ship].map((_, index) =>
            direction === 0
              ? [coordinates[0] + index, coordinates[1]]
              : [coordinates[0], coordinates[1] + index]
          );

          brandNewState.squadron[type][ship].forEach((item, index) => {
            item && (brandNewState.ally[item[1]][item[0]].ship = `${ type }-${ ship }-${ index }`);
          });
        })
      });
    } catch (e) {
      console.error(e);
    }
    return countShips(newState);
  };

  return place(newState);
}
