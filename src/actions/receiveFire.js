import getShip from '../scripts/getShip';
import isThereShip from '../scripts/isThereShip';
import shootAroundSankShip from '../scripts/shootAroundSankShip';
// TODO: refactor this shi
export default (state, action) => {
  let feedback;
  const newState = { ...state };
  const coordinates = [...action.payload.data];
  let data;
  const thereIsShip = isThereShip(newState.ally, coordinates);
  if (thereIsShip) {
    feedback = `hit`;
    newState.ally[coordinates[1]][coordinates[0]].hit = true;
    const [type, ship] = getShip(thereIsShip);
    const sank = newState.squadron[type][ship].reduce((a, item) => newState.ally[item[1]][item[0]].hit && a, true);
    if (sank) {
      feedback = `sank`;
      data = [];

      newState.squadron[type][ship].forEach(item => {
        newState.ally[item[1]][item[0]].sank = true;
        data.push(item);
      });

      newState.ally = shootAroundSankShip(newState.ally, data);
      newState.allyShipsLeft -= 1;

      if (newState.allyShipsLeft === 0) {
        newState.feedback = { type: `defeat` };
        return newState;
      }
    } else {
      data = [coordinates];
    }
  } else {
    feedback = `miss`;
    newState.ally[coordinates[1]][coordinates[0]].miss = true;
    data = [coordinates];
  }

  newState.feedback = { type: `feedback`, data, feedback };
  return newState;
}
