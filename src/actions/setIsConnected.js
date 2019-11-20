export default (state, action) => ({
  ...state,
  isConnected: action.payload,
});
