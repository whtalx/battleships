import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Sea from './Sea';
import Cell from './Cell';
import Label from './Label';
import TextButton from './TextButton';

const HintLabel = styled.label`
  grid-row: 1 / span 2;
  grid-column: 1 / span 10;
  text-align: center;
`;

const Confirm = styled(Label)`
  grid-row: 10;
  grid-column: 1 / span 10;
  align-items: center;
`;

const Ship = styled.div`
  grid-column: 2 / span 8;
  grid-row: ${ props => props.row };
  display: grid;
  grid-template: auto / repeat(8, 1fr);
`;

const Deck = styled(Cell)`
  grid-row-start: ${ props => props.row };
  grid-column-start: ${ props => props.column };
`;

const Times = styled(Cell)`
  grid-row-start: ${ props => props.row };
  grid-column-start: 7;
  border: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70% 70%;
`;

const Number = styled(Cell)`
  grid-row-start: ${ props => props.row };
  grid-column-start: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  font-size: 30px;
  font-weight: 200;
  line-height: 30px;

  @media screen and (min-width: 600px) and (min-height: 600px) {
    font-size: 5vmin;
    line-height: 4vmin;
  }
`;

const PlacingSea = styled(Sea)`
  & > div:after {
    grid-column-start: 1;
    grid-row-start: 3;
    display: ${ props => props.currentType === -1 ? `none` : `flex` };
    align-items: center;
    justify-content: center;
    transform: translateY(${ props => props.currentType * 200 }%);
    transition: transform .5s;
    font-size: 29px;
    line-height: 29px;
    content: '\u{E315}';
  }
`;

const PlacingShip = ({ decks, row, number }) =>
  <Ship row={ row }>
    {
      [...Array(decks).keys()].map(item =>
        <Deck key={ `placing-deck-${ decks }-${ item }` } column={ item + 1 } place />
      )
    }
    <Times times />
    <Number>{ number }</Number>
  </Ship>;

const Placing = (props) =>
  <PlacingSea currentType={props.sea.currentType}>
    <HintLabel>
      click on field to place ship manually<br/>or place them <TextButton onClick={ props.random }>randomly</TextButton>
    </HintLabel>
    <PlacingShip decks={4} row={3} number={props.sea.shipsToPlace.fourDecker}/>
    <PlacingShip decks={3} row={5} number={props.sea.shipsToPlace.threeDecker}/>
    <PlacingShip decks={2} row={7} number={props.sea.shipsToPlace.twoDecker}/>
    <PlacingShip decks={1} row={9} number={props.sea.shipsToPlace.singleDecker}/>
    {props.game.status === `confirm` &&
    <Confirm><TextButton onClick={props.ready}>confirm and proceed</TextButton></Confirm>}
  </PlacingSea>

const mapStateToProps = (state) => ({
  game: state.game,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  ready: () => dispatch({ type: `READY` }),
  random: () => dispatch({ type: `RANDOM` }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Placing);
