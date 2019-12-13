/**
 * there are four ship types:
 * four decker (1pc)
 * three decker (2pc)
 * two decker (3pc)
 * single decker (4pc)
 *
 * output is array of all types
 * each type is array of ships
 * each ship is array of decks
 * at start deck is null
 * later it will be array of coordinates -- [x, y]
 */

export default () =>
  [...Array(4).keys()].map(i =>
    [...Array(i + 1)].map(() =>
      [...Array(4 - i)].map(() =>
        null
      )
    )
  );
