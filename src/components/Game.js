import React from 'react';
import { connect } from 'react-redux';
import Ally from './Ally';
import Enemy from './Enemy';
import Ocean from './Ocean';
import Select from './Select';
import Placing from './Placing';
import TextBlock from './TextBlock';

const Game = (props) => {
  switch (props.status) {
    case `choose`:
    case `connect`:
      return <Select />;

    case `place`:
    case `confirm`:
      return (
        <Ocean>
          <Ally />
          <Placing />
        </Ocean>
      );

    case `victory`:
    case `wait`:
      return (
        <Ocean>
          <Ally />
          <TextBlock />
        </Ocean>
      );

    case `play`:
      return (
        <Ocean>
          <Ally />
          <Enemy />
        </Ocean>
      );

    case `defeat`:
      return (
        <Ocean>
          <TextBlock />
          <Enemy />
        </Ocean>
      );

    default:
      return null;
  }
};

const mapStateToProps = (state) => ({
  status: state.game.status,
});

export default connect(mapStateToProps)(Game);
