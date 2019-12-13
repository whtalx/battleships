export default (state, { payload }) => ({
  ...state,
  status: payload ? `connect` : `place`,
  type: payload ? `pvp` : `comp`,
  move: payload ? state.move : true,
  firstMove: payload ? state.firstMove : true,
});
