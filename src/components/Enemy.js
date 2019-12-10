import React from 'react';
import { connect } from 'react-redux';
import Sea from './Sea';
import Cell from './Cell';

const Enemy = (props) =>
  <Sea border grid move={ !props.game.move }>
    {
      props.sea.enemy.map(row =>
        row.map(cell =>
          <Cell key={ cell.id } data={ cell } onClick={ props.fire } move={ props.game.status === `play` && props.game.move && !props.rtc.waitingForFeedback } enemy />
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
  fire: (payload) => dispatch({ type: `SEND`, payload: { type: `fire`, data: payload }}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Enemy);
