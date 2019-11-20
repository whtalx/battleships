export default (state, action) => ({
  ...state,
  status: action.payload ? `connect` : `place`,
  type: action.payload ? `pvp` : `comp`,
  isEnemyReady: action.payload ? state.isEnemyReady : true,
});
