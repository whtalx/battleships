import React from 'react';
import { connect } from 'react-redux';
import Sea from './Sea';
import Cell from './Cell';

const Enemy = (props) =>
  <Sea move={ props.game.move }>
    {
      props.sea.enemy.map(row =>
        row.map(({ id, ship, hit, miss, sank }) =>
          <Cell
            key={ id }
            id={ id }
            last={ id === props.peer.lastSent }
            ship={ ship }
            hit={ hit }
            miss={ miss }
            sank={ sank }
            onClick={ () => { props.game.status === `play` && props.game.move && !props.peer.waitingForFeedback && !hit && !miss && props.fire(id) }}
            enemy
          />
        )
      )
    }
  </Sea>;

const mapStateToProps = (state) => ({
  game: state.game,
  peer: state.peer,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  fire: (payload) => dispatch({ type: `SEND`, payload: { type: `fire`, data: payload }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
