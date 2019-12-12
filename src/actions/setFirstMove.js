export default (state, action) => ({
  ...state,
  move: action.payload,
  firstMove: action.payload,
});
