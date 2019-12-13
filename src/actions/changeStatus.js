export default (state, { payload }) => ({
  ...state,
  status: payload,
  firstMove: payload === `victory` || payload === `defeat`
    ? !state.firstMove
    : state.firstMove,
});
