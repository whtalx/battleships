export default (state, { payload }) => ({
  ...state,
  message: payload,
  waitingForFeedback: payload.type === `fire`,
  lastSent: payload.type === `fire`
    ? `cell-${ payload.data[0] }-${ payload.data[1] }-enemy`
    : state.lastSent,
});
