export default (state, { payload }) => ({
  ...state,
  waitingForFeedback: false,
  lastReceived: payload.type === `fire`
    ? `cell-${ payload.data[0] }-${ payload.data[1] }-ally`
    : state.lastReceived,
});
