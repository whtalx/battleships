export default (state, action) => ({
  ...state,
  status: action.payload,
  firstMove: (action.payload === `victory` || action.payload === `defeat`) ? !state.firstMove : state.firstMove,
});
