import React from 'react';
import { connect } from 'react-redux';
import Sea from './Sea';
import Cell from './Cell';

const Ally = (props) =>
  <Sea border grid move={ props.game.move }>
    {
      props.sea.ally.map(row =>
        row.map(cell =>
          <Cell key={ cell.id } data={ cell } onClick={ (props.game.status === `place` || props.game.status === `confirm`) && props.place } />
        )
      )
    }
  </Sea>;

const mapStateToProps = (state) => ({
  game: state.game,
  sea: state.sea,
});

const mapDispatchToProps = (dispatch) => ({
  place: (payload) => dispatch({ type: `PLACE_SHIP`, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ally);
