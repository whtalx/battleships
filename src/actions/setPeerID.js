export default (state, action) => ({
  ...state,
  peerID: action.payload,
});
