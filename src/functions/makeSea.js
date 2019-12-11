export default (type) => {
  const ten = [...Array(10).keys()];

  return ten.map(y =>
    ten.map(x =>
      ({
        id: `cell-${ x }-${ y }-${ type }`,
        hit: false,
        miss: false,
        ship: false,
        sank: false,
      })
    )
  );
};
