import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import Grid from './Grid';
import getCoordinates from '../functions/getCoordinates';

const Enemy = ({ game, peer, sea, fire }) =>
  <Grid move={ game.move  }>
    {
      sea.enemy.map(row =>
        row.map(({ id, ship, hit, miss, sank }) =>
          <Cell
            enemy
            key={ id }
            id={ id }
            last={ id === peer.lastSent }
            ship={ Boolean(ship) }
            hit={ hit }
            miss={ miss }
            sank={ sank }
            onClick={
              () => {
                game.status === `play` &&
                game.move &&
                !peer.waitingForFeedback &&
                !hit &&
                !miss &&
                fire({ type: `fire`, data: getCoordinates(id) })
              }
            }
          />
        )
      )
    }
  </Grid>;

const mapStateToProps = (props) => ({ ...props });
const mapDispatchToProps = (dispatch) => ({
  fire: (payload) => dispatch({ type: `SEND`, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
