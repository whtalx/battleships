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

const ShipsLeft = (props) => {
  const isPlaced = ({ type, ship, deck }) =>
    props.sea.squadron[type][ship][deck] !== null;

  const Deck = ({ type, ship, deck }) =>
    <Cell
      last={
        props.sea.deckToPlace.type === type &&
        props.sea.deckToPlace.ship === ship &&
        props.sea.deckToPlace.deck === deck
      }
      ship={ !isPlaced({ type, ship, deck }) }
      isCompleted
    />;

  return (
    <Ships>
      {
        [...Array(7)].reduce(
          (heap, _, y) => y % 2 !== 0
            ? [...heap, ...[...Array(8).keys()].map((x) => <Space key={ `${ x }-${ y }` } />)]
            : [...heap, ...props.sea.squadron[y / 2].reduce(
                (row, ship, index) => {
                  const i = index > 0
                    ? props.sea.squadron[y / 2][index - 1].length * index + index
                    : index;
                  for (let deck = 0; deck < ship.length; deck++) {
                    row[deck + i] = <Deck key={ `${ y / 2 }-${ index }-${ deck }` } type={ y / 2 } ship={ props.sea.squadron[y / 2].length - index - 1 } deck={ ship.length - deck - 1 } />;
                  }
                  return row
                },
              [...Array(8)].map((_, x) => <Space key={ `${ x }-${ y }` } />)
            )],
          [],
        )
      }
    </Ships>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  ready: () => dispatch({ type: `READY` }),
  random: () => dispatch({ type: `RANDOM` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShipsLeft);
