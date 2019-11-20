export default (state, action) => ({
  ...state,
  isInitialised: action.payload,
});
