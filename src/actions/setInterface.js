export default (state, action) => ({
  ...state,
  interface: action.payload,
});
