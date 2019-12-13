import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cell from './Cell';

const Ships = styled.div`
  margin-top: 8px;
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(7, auto) / repeat(8, auto);
`;

const Space = styled.div`
  width: 0;
  height: 0;
`;

const ShipsLeft = ({ sea }) => {
  const isPlaced = ({ type, ship, deck }) =>
    sea.squadron[type][ship][deck] !== null;

  const makeDeck = ({ type, ship, deck }) =>
    <Cell
      key={ `${ type }-${ ship }-${ deck }` }
      last={
        sea.deckToPlace.type === type &&
        sea.deckToPlace.ship === ship &&
        sea.deckToPlace.deck === deck
      }
      ship={ !isPlaced({ type, ship, deck }) }
      isCompleted
    />;

  const emptyRow = ({ y }) =>
    [...Array(8).keys()].map((x) => <Space key={ `${ x }-${ y }` } />);

  return (
    <Ships>
      {
        [...Array(7)].reduce(
          (grid, _, y) => y % 2 !== 0
            ? [...grid, ...emptyRow({ y })]
            : [...grid, ...sea.squadron[y / 2].reduce(
                (row, ship, index) => {
                  const typeIndex = y / 2;
                  const shipIndex = sea.squadron[typeIndex].length - index - 1;
                  const i = index > 0
                    ? sea.squadron[typeIndex][index - 1].length * index + index
                    : index;
                  for (let deck = 0; deck < ship.length; deck++) {
                    const deckIndex = ship.length - deck - 1;
                    row[deck + i] = makeDeck({ type: typeIndex, ship: shipIndex, deck: deckIndex });
                  }
                  return row
                },
              emptyRow({ y })
            )],
          [],
        )
      }
    </Ships>
  );
};

const mapStateToProps = ({ sea }) => ({ sea });
export default connect(mapStateToProps)(ShipsLeft);
