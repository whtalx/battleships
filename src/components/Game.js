import React from 'react';
import { connect } from 'react-redux';
import Ally from './Ally';
import Enemy from './Enemy';
import Select from './Select';
import Modal from './Modal';
import Ocean from './Ocean';

const Game = ({ status }) => {
  switch (status) {
    case `choose`:
    case `connect`:
      return <Select />;

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
          <Modal />
          <Enemy />
        </Ocean>
      );

    default:
      return (
        <Ocean>
          <Ally />
          <Modal />
        </Ocean>
      );
  }
};

const mapStateToProps = (state) => ({
  status: state.game.status,
});

export default connect(mapStateToProps)(Game);
