export default (state, action) => {
  console.log(`received: `, JSON.parse(JSON.stringify(action.payload)));

  return {
    ...state,
    waitingForFeedback: false,
    lastReceived: action.payload.type === `fire` ? `cell-${ action.payload.data[0] }-${ action.payload.data[1] }-ally` : state.lastReceived,
  };
}
