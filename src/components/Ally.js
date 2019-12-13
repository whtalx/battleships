import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import Grid from './Grid';
import isShipPlaced from '../functions/isShipPlaced';

const Ally = ({ game, peer, sea, place }) =>
  <Grid move={ game.status === `place` || game.status === `confirm` || !game.move }>
    {
      sea.ally.map(row =>
        row.map(({ id, ship, hit, miss, sank }) =>
          <Cell
            key={ id }
            id={ id }
            last={ id === peer.lastReceived }
            ship={ Boolean(ship) }
            hit={ hit }
            miss={ miss }
            sank={ sank }
            isCompleted={ ship && isShipPlaced(ship, sea.squadron) }
            onClick={
              () => {
                (game.status === `place` || game.status === `confirm`) &&
                (sea.shipsToPlace > 0 || ship) &&
                place(id)
              }
            }
          />
        )
      )
    }
  </Grid>;

const mapStateToProps = (props) => ({ ...props });
const mapDispatchToProps = (dispatch) => ({
  place: (payload) => dispatch({ type: `PLACE_SHIP`, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ally);
