export default (state, action) => {
  console.log(`received: `, JSON.parse(JSON.stringify(action.payload)));
  return {
    ...state,
    waitingForFeedback: false,
  };
}
