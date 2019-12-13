import shootAroundSankShip from '../functions/shootAroundSankShip';

export default (state, { payload: { data, feedback } }) => {
  let { ally, enemy, enemyShipsLeft } = state;

  switch (feedback) {
    case `miss`: {
      const [x, y] = data;
      enemy[y][x].miss = true;
      break;
    }

    case `hit`: {
      const [x, y] = data;
      enemy[y][x].ship = true;
      enemy[y][x].hit = true;
      break;
    }

    case `sank`: {
      data.forEach(([x,  y]) => {
        enemy[y][x].hit = true;
        enemy[y][x].ship = true;
        enemy[y][x].sank = true;
      });
      enemy = shootAroundSankShip({ enemy, data });
      enemyShipsLeft -= 1;

      if (enemyShipsLeft === 0) {
        return {
          ...state,
          ally,
          enemy,
          enemyShipsLeft,
          feedback: { type: `victory`, data: ally },
        };
      }

      break;
    }

    default:
      break;
  }
  return {
    ...state,
    ally,
    enemy,
    enemyShipsLeft,
  };
}
