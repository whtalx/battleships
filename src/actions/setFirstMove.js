export default (state, { payload }) => ({
  ...state,
  move: payload,
  firstMove: payload,
});
