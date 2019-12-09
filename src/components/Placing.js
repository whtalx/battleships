import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Sea from './Sea';
import Cell from './Cell';
import Label from './Label';
import TextButton from './TextButton';
//
// const HintLabel = styled.label`
//   grid-row: 1 / span 2;
//   grid-column: 1 / span 10;
//   text-align: center;
// `;
//
// const Confirm = styled(Label)`
//   grid-row: 10;
//   grid-column: 1 / span 10;
//   align-items: center;
// `;
//
// const Ship = styled.div`
//   grid-column: 2 / span 8;
//   grid-row: ${ props => props.row };
//   display: grid;
//   grid-template: auto / repeat(8, 1fr);
// `;
//
// const Deck = styled(Cell)`
//   grid-row-start: ${ props => props.row };
//   grid-column-start: ${ props => props.column };
// `;
//
// const Times = styled(Cell)`
//   grid-row-start: ${ props => props.row };
//   grid-column-start: 7;
//   border: 0;
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 70% 70%;
// `;
//
// const Number = styled(Cell)`
//   grid-row-start: ${ props => props.row };
//   grid-column-start: 8;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 0;
//   font-size: 30px;
//   font-weight: 200;
//   line-height: 30px;
//
//   @media screen and (min-width: 600px) and (min-height: 600px) {
//     font-size: 5vmin;
//     line-height: 4vmin;
//   }
// `;
//
// const PlacingSea = styled(Sea)`
//   & > div:after {
//     grid-column-start: 1;
//     grid-row-start: 3;
//     display: ${ props => props.currentType === -1 ? `none` : `flex` };
//     align-items: center;
//     justify-content: center;
//     transform: translateY(${ props => props.currentType * 200 }%);
//     transition: transform .5s;
//     font-size: 29px;
//     line-height: 29px;
//     content: '\u{E315}';
//   }
// `;
//
// const PlacingShip = ({ decks, row, number }) =>
//   <Ship row={ row }>
//     {
//       [...Array(decks).keys()].map(item =>
//         <Deck key={ `placing-deck-${ decks }-${ item }` } column={ item + 1 } place />
//       )
//     }
//     <Times times />
//     <Number>{ number }</Number>
//   </Ship>;
//
// const Placing = (props) =>
//   <PlacingSea currentType={props.sea.currentType}>
//     <HintLabel>
//       click on field to place ship manually<br/>or place them <TextButton onClick={ props.random }>randomly</TextButton>
//     </HintLabel>
//     <PlacingShip decks={4} row={3} number={props.sea.shipsToPlace.fourDecker}/>
//     <PlacingShip decks={3} row={5} number={props.sea.shipsToPlace.threeDecker}/>
//     <PlacingShip decks={2} row={7} number={props.sea.shipsToPlace.twoDecker}/>
//     <PlacingShip decks={1} row={9} number={props.sea.shipsToPlace.singleDecker}/>
//     {props.game.status === `confirm` &&
//     <Confirm><TextButton onClick={props.ready}>confirm and proceed</TextButton></Confirm>}
//   </PlacingSea>

const Wrapper = styled.div`
  padding: 8px 4px;
  margin: 8px 16px 16px 8px;
  width: calc(50vmin - 28px);
  height: calc(50vmin - 28px);
  min-width: 276px;
  min-height: 276px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--gray);
  box-shadow: 16px 16px 0 var(--black);
  color: var(--white);

  :before {
    content: '${ props => props.title }';
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
  padding: 32px 12px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border: 3px double var(--white);
`;

const Left = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template: repeat(7, 32px) / repeat(8, 32px);
  //border: 2px solid var(--yellow);
  //background-color: var(--silver);
`;

const Ship = styled.div`
  background-color: var(--navy);
  border: 1px solid var(--silver);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Placing = (props) => {
  const isPlaced = (type, ship, deck) => props.sea.squadron[type][ship][deck] === null && `▐█▌`;

  return (
    <Wrapper title={ `place your ships` }>
      <Content>
        ships left:
        <Left>
          {/*{*/}
          {/*  [...Array(7).keys()].reduce((array, ys) =>*/}
          {/*      [*/}
          {/*        ...array,*/}
          {/*        [...Array(8).keys()].map((xs) =>*/}
          {/*          <div>*/}
          {/*            {*/}
          {/*              ys % 2 !== 0*/}
          {/*                ? `\u{00A0}`*/}
          {/*                : // TODO: implement algorithm for creating layout placed below */}
          {/*            }*/}
          {/*          </div>*/}
          {/*        )*/}
          {/*      ],*/}
          {/*    []*/}
          {/*  )*/}
          {/*}*/}
          <Ship>{ isPlaced(0,0,3) }</Ship>
          <Ship>{ isPlaced(0,0,2) }</Ship>
          <Ship>{ isPlaced(0,0,1) }</Ship>
          <Ship>{ isPlaced(0,0,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>

          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>

          <Ship>{ isPlaced(1,1,2) }</Ship>
          <Ship>{ isPlaced(1,1,1) }</Ship>
          <Ship>{ isPlaced(1,1,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <Ship>{ isPlaced(1,0,2) }</Ship>
          <Ship>{ isPlaced(1,0,1) }</Ship>
          <Ship>{ isPlaced(1,0,0) }</Ship>
          <div>{ `\u{00A0}` }</div>

          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>

          <Ship>{ isPlaced(2,2,1) }</Ship>
          <Ship>{ isPlaced(2,2,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <Ship>{ isPlaced(2,1,1) }</Ship>
          <Ship>{ isPlaced(2,1,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <Ship>{ isPlaced(2,0,1) }</Ship>
          <Ship>{ isPlaced(2,0,0) }</Ship>

          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>
          <div>{ `\u{00A0}` }</div>

          <Ship>{ isPlaced(3,3,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <Ship>{ isPlaced(3,2,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <Ship>{ isPlaced(3,1,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
          <Ship>{ isPlaced(3,0,0) }</Ship>
          <div>{ `\u{00A0}` }</div>
        </Left>
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