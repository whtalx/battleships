export default (type) =>
  [...Array(10).keys()].map(y =>
    [...Array(10).keys()].map(x =>
      ({
        id: `cell-${ x }-${ y }-${ type }`,
        hit: false,
        miss: false,
        ship: false,
        sank: false,
      })
    )
  );
