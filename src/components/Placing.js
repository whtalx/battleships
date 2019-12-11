import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  padding: 8px 4px;
  margin: 8px 24px 24px 8px;
  width: calc(50vmin - 36px);
  height: calc(50vmin - 36px);
  min-width: 276px;
  min-height: 276px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--gray);
  box-shadow: 16px 16px 0 var(--black);
  color: var(--white);

  :before {
    content: '${ props => props.title_ }';
    padding: 0 8px;
    position: absolute;
    top: 2px;
    left: 50%;
    width: max-content;
    height: 16px;
    background-color: inherit;
    color: inherit;
    transform: translateX(-50%);
    z-index: 1;
  }
`;

const Content = styled.div`
  padding: 16px 0 0;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px double var(--white);

  hr {
    margin: 8px 0;
    border: 0;
    outline: 0;
    width: 100%;
    height: 1px;
    background-color: var(--white);
  }
`;

const ShipsLeft = styled.div`
  margin-top: 8px;
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(7, auto) / repeat(8, auto);
`;

const StyledDeck = styled.div`
  width: calc(5vmin - 2px);
  height: calc(5vmin - 2px);
  min-width: 29px;
  min-height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--blue);

  ${
    props => !props.isPlaced && css`
      :after {
        content: '';
        width: 60%;
        height: 50%;
        background-color: ${
          props.isNext
            ? css`var(--aqua)`
            : css`var(--white)`
        };
      }
    `
  }
`;

const Space = styled.div`
  width: 0;
  height: 0;
`;

const Buttons = styled.div`
  margin-top: -8px;
  flex-grow: 1;
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const Placing = (props) => {
  const isPlaced = ({ type, ship, deck }) =>
    props.sea.squadron[type][ship][deck] !== null;

  const Deck = ({ type, ship, deck }) =>
    <StyledDeck
      isNext={
        props.sea.deckToPlace.type === type &&
        props.sea.deckToPlace.ship === ship &&
        props.sea.deckToPlace.deck === deck
      }
      isPlaced={ isPlaced({ type, ship, deck }) }
    />;

  return (
    <Wrapper title_={ `place your ships` }>
      <Content>
        click on field to place<br />or delete ship deck<hr />ships left:
        <ShipsLeft>
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
        </ShipsLeft>
        <hr />
        <Buttons>
          <Button text={ `random` } index={ 0 } onClick={ props.random } autoFocus />
          <Button text={ `confirm` } index={ 0 } onClick={ props.game.status === `confirm` && props.ready } />
        </Buttons>
      </Content>
    </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Placing);