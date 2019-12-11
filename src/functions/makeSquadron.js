/**
 * there are four ship types:
 * 4-deck (1pc)
 * 3-deck (2pc)
 * 2-deck (3pc)
 * 1-deck (4pc)
 *
 * output is array of all ships
 * each ship is array of decks
 * each deck is array of coordinates -- [x, y]
 * by default deck is null
 */

export default () =>
  [...Array(4).keys()].map(h =>
    [...Array(h + 1)].map(_ =>
      [...Array(4 - h)].map(_ =>
        null
      )
    )
  );
