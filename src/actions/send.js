import getCoordinates from '../scripts/getCoordinates';

export default (state, action) => {
  const message = action.payload.type === `fire`
    ? { type: `fire`, data: getCoordinates(action.payload.data) }
    : { ...action.payload };

  state.interface.send(message);
  console.log(`sent:     `, JSON.parse(JSON.stringify(message)));

  return state;
}
