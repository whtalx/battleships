export default (state) => ({
  ...state,
  feedback: {
    type: `victory`,
    data: [
      ...state.ally.map(row =>
        row.map(cell => {
          const c = {};
          cell.ship && (c.ship = true);
          cell.hit && (c.hit = cell.hit);
          cell.miss && (c.miss = cell.miss);
          cell.sank && (c.sank = cell.sank);
          return c;
        })
      )
    ],
  },
});
