/**
 * input: `ship` parameter of cell (array [type, ship, deck])
 * return: all decks of that ship are not null
 */

export default ([type, ship], squadron) =>
  squadron[type][ship].reduce(
    (completed, deck) =>
      completed
        ? deck !== null
        : false,
    true
  );
