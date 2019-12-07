import React from 'react';
import { connect } from 'react-redux';
import Sea from './Sea';
import Cell from './Cell';

const Ally = (props) =>
  <Sea move={ !props.game.move }>
    {
      props.sea.ally.map(row =>
        row.map(({ id, ship, hit, miss, sank }) =>
          <Cell
            key={ id }
            id={ id }
            last={ id === props.rtc.lastReceived }
            ship={ ship }
            hit={ hit }
            miss={ miss }
            sank={ sank }
            onClick={ () => { ((props.game.status === `place` || props.game.status === `confirm`) && (props.sea.shipsToPlace.total > 0 || ship)) && props.place(id) }}
          />
        )
      )
    }
  </Sea>;

const mapStateToProps = (state) => ({
  game: state.game,
  rtc: state.rtc,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  place: (payload) => dispatch({ type: `PLACE_SHIP`, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ally);
