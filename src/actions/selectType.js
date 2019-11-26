export default (state, action) => ({
  ...state,
  status: action.payload ? `connect` : `place`,
  type: action.payload ? `pvp` : `comp`,
  move: action.payload ? state.move : true,
});
