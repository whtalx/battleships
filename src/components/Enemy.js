import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import Grid from './Grid';
import Window from './Window';
import active from '../themes/active';
import inactive from '../themes/inactive';

const Enemy = (props) =>
  <Window theme={ props.game.move ? active : inactive }>
    <Grid>
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
    </Grid>
  </Window>;

const mapStateToProps = (state) => ({
  game: state.game,
  peer: state.peer,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  fire: (payload) => dispatch({ type: `SEND`, payload: { type: `fire`, data: payload }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
