import itSank from '../functions/itSank';
import getShip from '../functions/getShip';
import isThereShip from '../functions/isThereShip';
import shootAroundSankShip from '../functions/shootAroundSankShip';

export default (state, action) => {
  let feedback;
  const data = [];
  const newState = { ...state };
  const coordinates = [...action.payload.data];
  const thereIsShip = isThereShip(newState.ally, coordinates);

  if (thereIsShip) {
    newState.ally[coordinates[1]][coordinates[0]].hit = true;
    const [type, ship] = getShip(thereIsShip);
    if (itSank(type, ship, newState)) {
      newState.allyShipsLeft -= 1;
      if (newState.allyShipsLeft === 0) {
        newState.feedback = { type: `defeat` };
        return newState;
      }

      newState.squadron[type][ship].forEach(item => {
        newState.ally[item[1]][item[0]].sank = true;
        data.push(item);
      });

      newState.ally = shootAroundSankShip(newState.ally, data);
      feedback = `sank`;
    } else {
      feedback = `hit`;
    }
  } else {
    feedback = `miss`;
    newState.ally[coordinates[1]][coordinates[0]].miss = true;
  }

  data.length === 0 && data.push(coordinates);
  newState.feedback = { type: `feedback`, data, feedback };
  return newState;
}
