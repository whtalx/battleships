/**
 * 0 == empty
 * 1 == miss
 * 2 == sank
 * 3 == hit
 * 4 == ship
 */

export default (state) => ({
  ...state,
  feedback: {
    type: `victory`,
    data: state.ally.map(row =>
      row.map(cell =>
        cell.miss
          ? 1
          : cell.sank
            ? 2
            : cell.hit
              ? 3
              : cell.ship
                ? 4
                : 0
      )
    ),
  },
});
