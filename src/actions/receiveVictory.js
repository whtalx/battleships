/**
 * 0 == empty
 * 1 == miss
 * 2 == sank
 * 3 == hit
 * 4 == ship
 */

export default (state, action) => ({
  ...state,
  enemy: [
    ...action.payload.data.map((row, y) =>
      row.map((cell, x) => ({
        id: `cell-${ x }-${ y }-enemy`,
        miss: cell === 1,
        sank: cell === 2,
        hit: cell === 3 || cell === 2,
        ship: cell === 4 || cell === 3 || cell === 2,
      }))
    )
  ],
});
