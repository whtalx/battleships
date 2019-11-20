export default (state, action) => ({
  ...state,
  enemy: [
    ...action.payload.data.map((row, y) =>
      row.map((cell, x) => ({
        ...cell, id: `cell-${ x }-${ y }-enemy`
      }))
    )
  ],
});
