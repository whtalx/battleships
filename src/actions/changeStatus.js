export default (state, action) => ({
  ...state,
  status: action.payload,
});
