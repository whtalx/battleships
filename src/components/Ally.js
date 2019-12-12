import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import isShipPlaced from '../functions/isShipPlaced';
import Window from './Window';
import active from '../themes/active';
import inactive from '../themes/inactive';
import Grid from './Grid';

const Ally = (props) =>
  <Window theme={ (props.game.status === `place` || props.game.status === `confirm` || !props.game.move) ? active : inactive }>
    <Grid>
      {
        props.sea.ally.map(row =>
          row.map(({ id, ship, hit, miss, sank }) =>
            <Cell
              key={ id }
              id={ id }
              last={ id === props.peer.lastReceived }
              ship={ ship }
              hit={ hit }
              miss={ miss }
              sank={ sank }
              isCompleted={ isShipPlaced({ cell: ship, squadron: props.sea.squadron }) }
              onClick={ () => { ((props.game.status === `place` || props.game.status === `confirm`) && (props.sea.shipsToPlace > 0 || ship)) && props.place(id) }}
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
  place: (payload) => dispatch({ type: `PLACE_SHIP`, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ally);
