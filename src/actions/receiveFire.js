import itSank from '../functions/itSank';
import isThereShip from '../functions/isThereShip';
import shootAroundSankShip from '../functions/shootAroundSankShip';

export default (state, { payload }) => {
  let { ally, squadron, allyShipsLeft } = state;
  const [x, y] = payload.data;
  const thereIsShip = isThereShip(ally, [x, y]);
  let data = [x, y];
  let feedback;

  if (thereIsShip) {
    ally[y][x].hit = true;
    const [type, ship] = thereIsShip;
    if (itSank(squadron[type][ship], ally)) {
      allyShipsLeft -= 1;
      if (allyShipsLeft === 0) {
        return {
          ...state,
          ally,
          squadron,
          allyShipsLeft,
          feedback: { type: `defeat` },
        };
      }

      data = squadron[type][ship];
      data.forEach(item => {
        ally[item[1]][item[0]].sank = true;
      });

      ally = shootAroundSankShip({ ally, data });
      feedback = `sank`;
    } else {
      feedback = `hit`;
    }
  } else {
    feedback = `miss`;
    ally[y][x].miss = true;
  }

  return {
    ...state,
    ally,
    squadron,
    allyShipsLeft,
    feedback: {
      type: `feedback`,
      data,
      feedback,
    },
  };
}
