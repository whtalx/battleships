import shootAroundSankShip from '../scripts/shootAroundSankShip';

export default (state, action) => {
  const newState = { ...state };
  const ship = [...action.payload.data];
  const feedback = action.payload.feedback;

  switch (feedback) {
    case `miss`: {
      newState.enemy[ship[0][1]][ship[0][0]].miss = true;
      break;
    }

    case `hit`: {
      newState.enemy[ship[0][1]][ship[0][0]].ship = true;
      newState.enemy[ship[0][1]][ship[0][0]].hit = true;
      break;
    }

    case `sank`: {
      ship.forEach(item => {
        newState.enemy[item[1]][item[0]].hit = true;
        newState.enemy[item[1]][item[0]].ship = true;
        newState.enemy[item[1]][item[0]].sank = true;
      });
      newState.enemy = shootAroundSankShip(newState.enemy, ship);
      newState.enemyShipsLeft -= 1;

      if (newState.enemyShipsLeft === 0) {
        newState.feedback = { type: `victory`, data: [...newState.ally] };
        return newState;
      }

      break;
    }

    default:
      break;
  }
  return newState;
}
